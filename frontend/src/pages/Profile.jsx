import FormGroup from '../components/FormGroup'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Avatar, Typography } from 'antd'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { app } from '../firebase'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useUpdateUserAvatarMutation, useUpdateUserMutation } from '../app/services/api'
import { updateAvatar, updateUserSuccess } from '../app/reducers/auth.slice'




const validationScheme = yup.object().shape({
  username: yup.string().required('username is required'),
  email: yup.string().email('insert valid email address').required('Email is required'),
  password: yup.string(),
  avatar: yup.string()
})

const Profile = () => {
  const { Title } = Typography;
  const { currentUser } = useSelector(state => state.auth);
  const [uploadedFile, setUploadedFile] = React.useState(undefined);
  const [uploadPerc, setUploadPerc] = React.useState(0);
  const [fileUploadError, setFileUploadError] = React.useState(false);
  const dispatch = useDispatch();

  const [updateUserAvatar, { isLoading: updatingAvatar, error: updateAvatarError }] = useUpdateUserAvatarMutation();
  const [updateUser, { isLoading: upadatingUsr, error: updateUserError }] = useUpdateUserMutation();

  const fileRef = useRef(null)


  React.useEffect(() => {
    if (uploadedFile) {
      handleUploadedFile(uploadedFile);
    }
  }, [uploadedFile]);

  const handleUploadedFile = (file) => {
    const storage = getStorage(app);
    console.log(storage);
    // give unique name the file
    const fileName = new Date().getTime() + file.name
    // storage ref
    const storageRef = ref(storage, fileName);
    // upload task
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        setUploadPerc(Math.floor(progress));
      },
      (error) => {
        setFileUploadError(true)
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(res => {
          // UPDATE THE VALUE OF THE AVATAR IN THE FORMIK
          setFieldValue('avatar', res);
          // GETTING THE ID OF THE CURRENT USER TO UPDATE THE AVATAR IN DB
          const id = currentUser._id;
          // UPDATING THE VALUE OF AVATAR BOTH IN DB AND REDUX STORE OF CURRENT USER
          updateUserAvatar({ id, ...{ avatar: res } })
            .unwrap().then(ress => { dispatch(updateAvatar({ avatar: res })) })
            .catch(er => console.log(er));
        })
      }
    );
  }



  const formik = useFormik({
    initialValues: {
      avatar: currentUser && currentUser.avatar || " ",
      username: currentUser && currentUser.username || "",
      email: currentUser && currentUser.email || "",
      password: ""
    },
    validationSchema: validationScheme,
    onSubmit: async (values) => {
      const id = currentUser._id
      await updateUser({
        id, ...{
          username: values.username,
          email: values.email,
          avatar: values.avatar,
          password: values.password ? values.password : undefined
        }
      }).unwrap()
        .then(res => dispatch(updateUserSuccess(res)))
        .catch(er => console.log(er))
    }
  });

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = formik;




  return (
    <div className='flex flex-col justify-center items-center w-full mt-4'>
      <Title level={2}>Profile</Title>
      <input type='file' onChange={(e) => setUploadedFile(e.target.files[0])} className='hidden' accept='image/*' hidden ref={fileRef} />
      <Avatar size={64} src={values.avatar} onClick={() => fileRef.current.click()} />
      {uploadPerc > 0 && uploadPerc < 100 && <p className='text-green-500 text-sm mt-2'>Uploaded {uploadPerc}%</p>}
      {fileUploadError && <div className='text-sm text-red-600'>There is an error while uploading the file ....</div>}
      <div className='flex flex-col w-96  p-4'>

        <FormGroup>
          <label htmlFor="username" className='font-semibold'>Username</label>
          <input type='text' name='username' onChange={handleChange} disabled={updatingAvatar || upadatingUsr} value={values.username} className='input-form' />
          {touched.username && errors.username && <div className='text-sm text-red-600'>{errors.username}</div>}

        </FormGroup>
        <FormGroup>
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input type='email' name='email' onChange={handleChange} disabled={updatingAvatar || upadatingUsr} value={values.email} className='input-form' />
          {touched.email && errors.email && <div className='text-sm text-red-600'>{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="password" className='font-semibold'>Password</label>
          <input type='text' name='password' onChange={handleChange} disabled={updatingAvatar || upadatingUsr} value={values.password} className='input-form' />
          {touched.password && errors.password && <div className='text-sm text-red-600'>{errors.password}</div>}
        </FormGroup>
        <div>
          <button className='button-design bg-gray-600 text-white' type='submit' disabled={upadatingUsr || updatingAvatar} onClick={handleSubmit}>{upadatingUsr || updatingAvatar ? 'Loading...' : 'Update'}</button>
          <button className='button-design bg-green-600 text-white'>Create Listing</button>
        </div>
        <div className='flex w-full justify-between items-center mt-2'>
          <Link className='text-red-600'>Delete Account</Link>
          <Link className='text-blue-600'>SignOut</Link>
        </div>
        <div className='flex justify-center items-center w-full text-sm text-red-600'>{updateUserError ? `Error: ${updateUserError.data.message}` : ''}</div>
        <div className='flex justify-center items-center w-full text-sm text-red-600'>{updateAvatarError ? `Error: ${updateAvatarError.data.message}` : ''}</div>
      </div>
    </div>
  )
}

export default Profile