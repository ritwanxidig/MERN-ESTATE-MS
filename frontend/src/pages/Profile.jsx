import FormGroup from '../components/FormGroup'
import { useSelector } from 'react-redux'
import { Avatar, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'




const validationScheme = yup.object().shape({
  username: yup.string().required('username is required'),
  email: yup.string().email('insert valid email address').required('Email is required'),
  password: yup.string().required('password is required'),
  avatar: yup.string()
})

const Profile = () => {
  const { Title } = Typography;
  const { currentUser } = useSelector(state => state.auth);



  const formik = useFormik({
    initialValues: {
      avatar: currentUser && currentUser.avatar || " ",
      username: currentUser && currentUser.username || "",
      email: currentUser && currentUser.email || "",
      password: ""
    },
    validationSchema: validationScheme,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;




  return (
    <div className='flex flex-col justify-center items-center w-full mt-4'>
      <Title level={2}>Profile</Title>
      <Avatar size={64} src={values.avatar} />
      {errors.avatar && <div className='text-sm text-red-600'>{errors.avatar}</div>}
      <div className='flex flex-col w-96  p-4'>

        <FormGroup>
          <label htmlFor="username" className='font-semibold'>Username</label>
          <input type='text' name='username' onChange={handleChange} value={values.username} className='input-form' />
          {touched.username && errors.username && <div className='text-sm text-red-600'>{errors.username}</div>}

        </FormGroup>
        <FormGroup>
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input type='email' name='email' onChange={handleChange} value={values.email} className='input-form' />
          {touched.email && errors.email && <div className='text-sm text-red-600'>{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="password" className='font-semibold'>Password</label>
          <input type='text' name='password' onChange={handleChange} value={values.password} className='input-form' />
          {touched.password && errors.password && <div className='text-sm text-red-600'>{errors.password}</div>}
        </FormGroup>
        <div>
          <button className='button-design bg-gray-600 text-white' type='submit' onClick={handleSubmit}>Update</button>
          <button className='button-design bg-green-600 text-white'>Create Listing</button>
        </div>
        <div className='flex w-full justify-between items-center mt-2'>
          <Link className='text-red-600'>Delete Account</Link>
          <Link className='text-blue-600'>SignOut</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile