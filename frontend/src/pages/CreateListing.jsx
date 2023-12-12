import FormGroup from '../components/FormGroup';
import { useCreateListingMutation } from '../app/services/api.js'
import { Image, Spin, Typography } from 'antd'
import { useFormik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'



const validationSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  address: yup.string().required('address is required'),
  regularPrice: yup.number().required('price is required').min(1, "value must be greater than 1"),
  discountPrice: yup.number()
    .test('is less than the regular price', 'Discount Price must be less than the regular price', function (value) {
      const regularPrice = this.parent.regularPrice || 0;
      return value < regularPrice
    }),
  images: yup.array().required('images is required'),
  beds: yup.number().required('beds is required'),
  baths: yup.number().required('baths is required'),
  parking: yup.boolean().required('parking is required'),
  furnished: yup.boolean().required('furnished is required'),
  sell: yup.boolean().required('sell is required'),
  rent: yup.boolean().required('rent is required'),
  type: yup.string().required('type is required'),
  offer: yup.boolean().required('offer is required'),
})


const CreateListing = () => {
  const { Title } = Typography;
  const [files, setFiles] = React.useState([]);
  const [uploadError, setUploadError] = React.useState(null);
  const [uploadingState, setUploadingState] = React.useState(false)
  const [uploadPerc, setUploadPerc] = React.useState()
  const { currentUser } = useSelector(state => state.auth)

  const [createListing, { isLoading: isAdding }] = useCreateListingMutation();

  const navigate = useNavigate();


  const handleUploadImages = () => {
    if (files.length > 0 && files.length + values.images.length < 7) {
      setUploadingState(true);
      setUploadError(null);
      const promises = [];
      for (const file of files) {
        promises.push(storeImage(file));
      }
      Promise.all(promises)
        .then(urls => {
          setFieldValue('images', values.images.concat(urls));
          setUploadError(null)
          setUploadingState(false);
        })
        .catch(er => {
          console.log("firebase image upload error: ", er);
          setUploadError("Maximum Image must be 2MB");
          setUploadingState(false)
        })
    }
    else {
      setUploadError("only 6 Images Allowed");
      setUploadingState(false);
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
          const percentage = Math.floor(progress);
          setUploadPerc(percentage);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((donwloadURL) => {
              resolve(donwloadURL)
            })
        }
      );
    })
  }

  const handleRemoveImageUpload = (index) => {
    const updatedImages = values.images.filter((_, i) => values.images[i] !== values.images[index]);
    setFieldValue('images', updatedImages);
  }

  const handleChangeType = (e) => {
    if (e.target.name === 'sell' || e.target.name === 'rent') {
      setFieldValue('type', e.target.name);
      handleChange(e);
    }
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      address: '',
      regularPrice: 0.0,
      discountPrice: 0,
      images: [],
      beds: 1,
      baths: 1,
      parking: false,
      furnished: false,
      sell: false,
      type: '',
      rent: false,
      offer: false
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.images.length <= 0) {
        setFieldError('images', 'you must upload at least one image')
        return;
      }
      const payload = {
        name: values.name,
        description: values.description,
        address: values.address,
        regularPrice: values.regularPrice,
        discountPrice: values.offer ? values.discountPrice : 0,
        imageUrls: values.images,
        bathrooms: values.baths,
        bedrooms: values.beds,
        furnished: values.furnished,
        parking: values.parking,
        type: values.type,
        offer: values.offer,
        userRef: currentUser._id
      }

      try {
        await createListing(payload)
          .unwrap()
          .then(res => { console.log(res); navigate('/listings') })
          .catch(er => console.log(er))
      } catch (error) {
        console.log(error)
      }
    }
  });


  const { values, errors, touched, handleChange, handleSubmit, setFieldValue, setFieldError } = formik;


  return (
    <div className='flex w-full flex-col p-4 max-w-7xl mx-auto'>
      <Spin spinning={isAdding} fullscreen />
      <Title level={3} className='text-center font-bold'>Create Listing</Title>
      <div className='flex flex-col md:flex-row justify-between items-start gap-5'>
        <div className="flex flex-col w-full">
          {/* First three column forms */}
          <div>
            <FormGroup>
              <label htmlFor="name" className='font-semibold'>Name</label>
              <input type='text' id='name' name='name' value={values.name} onChange={handleChange} className='input-form' />
              {touched.name && errors.name && <div className='text-sm text-red-500'>{errors.name}</div>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="description" className='font-semibold'>Description</label>
              <textarea name='description' id='description' value={values.description} onChange={handleChange} className='input-form max-h-20' />
              {touched.description && errors.description && <div className='text-sm text-red-500'>{errors.description}</div>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="address" className='font-semibold'>Address</label>
              <input type='text' id='address' name='address' value={values.address} onChange={handleChange} className='input-form' />
              {touched.address && errors.address && <div className='text-sm text-red-500'>{errors.address}</div>}
            </FormGroup>
          </div>

          {/* Second five row forms */}
          <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 mt-4'>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.type === 'sell'} id="sell" name='sell' onChange={handleChangeType} className='checkbox-design' />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.type === 'rent'} id="rent" name='rent' onChange={handleChangeType} className='checkbox-design' />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.furnished} id="furnished" name='furnished' onChange={handleChange} className='checkbox-design' />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.parking} id="parking" name='parking' onChange={handleChange} className='checkbox-design' />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.offer} id="offer" name='offer' onChange={handleChange} className='checkbox-design' />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          {/* third three row forms */}
          <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 mt-4'>
            <FormGroup>
              <label htmlFor="beds" className='font-semibold'>Beds</label>
              <input type='number' id='beds' name='beds' value={values.beds} onChange={handleChange} className='input-form' />
              {touched.beds && errors.beds && <div className='text-sm text-red-500'>{errors.beds}</div>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="baths" className='font-semibold'>Baths</label>
              <input type='number' id='baths' name='baths' value={values.baths} onChange={handleChange} className='input-form' />
              {touched.baths && errors.baths && <div className='text-sm text-red-500'>{errors.baths}</div>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="regularPrice" className='font-semibold'>Regular Price</label>
              <input type='number' id='regularPrice' name='regularPrice' value={values.regularPrice} onChange={handleChange} placeholder='0.00' className='input-form' />
              {touched.regularPrice && errors.regularPrice && <div className='text-sm text-red-500'>{errors.regularPrice}</div>}
            </FormGroup>
            {values.offer && <FormGroup>
              <label htmlFor="discountPrice" className='font-semibold'>Discount Price</label>
              <input type='number' id='discountPrice' name='discountPrice' value={values.discountPrice} onChange={handleChange} placeholder='0.00' className='input-form' />
              {touched.discountPrice && errors.discountPrice && <div className='text-sm text-red-500'>{errors.discountPrice}</div>}
            </FormGroup>}
          </div>
        </div>
        {/* Last section of Image upload in form */}
        <div className='flex flex-col w-full'>
          <h4 level={5} className='text-centr font-medium'>Images: <span className='font-normal text-sm'>Upload max 6 images, the first one will be the cover,image must be less than 2MB</span> </h4>
          <Spin spinning={uploadingState}>
            <div className='flex w-full gap-2 mt-5'>
              <input type='file' onChange={(e) => setFiles(e.target.files)} accept='images/.*' className='input-form' multiple />
              <button
                disabled={uploadingState}
                className='button-design2 bg-blue-500 hover:bg-blue-600 text-white'
                onClick={handleUploadImages}
              >
                {uploadingState ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {errors.images && <div className='text-sm text-red-600'>{errors.images}</div>}
          </Spin>
          <p><span className='text-green-500 text-sm'>{uploadingState && `Uploaded ${uploadPerc}%`}</span></p>
          <p><span className='text-red-500 text-sm'>{uploadError && `Error: ${uploadError}`}</span></p>
          {values.images && values.images.length > 0 ? (
            <div className='flex flex-col gap-4 w-full mt-5'>
              {values.images.map((imgUrl, i) => (
                <div key={imgUrl} className='flex w-full justify-between gap-3 py-2 items-center border-b-2'>
                  <Image
                    width={50}
                    src={imgUrl}
                    className='flex'
                  />
                  <button
                    onClick={() => handleRemoveImageUpload(i)}
                    className='px-2 py-1 rounded-xl bg-red-500 hover:bg-red-400 text-white transition-all'>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <button type='submit' onClick={handleSubmit} className="button-design bg-green-500 hover:bg-green-600 transition-all duration-700 font-semibold text-white">Submit</button>
        </div>
      </div>
    </div>

  )
}

export default CreateListing