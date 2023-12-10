import FormGroup from '../components/FormGroup';
import { Typography } from 'antd'
import { useFormik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import React from 'react'



const validationSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  address: yup.string().required('address is required'),
  regularPrice: yup.number().required('price is required'),
  // discountPrice: yup.number().required('price is required'),
  images: yup.array().required('images is required'),
  beds: yup.number().required('beds is required'),
  baths: yup.number().required('baths is required'),
  parking: yup.boolean().required('parking is required'),
  furnished: yup.boolean().required('furnished is required'),
  sell: yup.boolean().required('sell is required'),
  rent: yup.boolean().required('rent is required'),
  offer: yup.boolean().required('offer is required'),
})


const CreateListing = () => {
  const { Title } = Typography;
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      address: '',
      regularPrice: 0.0,
      // discountPrice: 0,
      images: [],
      beds: 1,
      baths: 1,
      parking: false,
      furnished: false,
      sell: false ,
      rent: false,
      offer: false
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  });


  const { values, errors, touched, handleChange, handleSubmit } = formik


  return (
    <div className='flex w-full flex-col p-4 max-w-7xl mx-auto'>
      <Title level={3} className='text-center font-bold'>Create Listing</Title>
      <div className='flex flex-col md:flex-row justify-between items-start gap-5'>
        <div className="flex flex-col w-full">
          {/* First three column forms */}
          <FormGroup>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input type='text' name='name' value={values.name} onChange={handleChange} className='input-form' />
            {touched.name && errors.name && <div className='text-sm text-red-500'>{errors.name}</div>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="description" className='font-semibold'>Description</label>
            <textarea name='description' value={values.description} onChange={handleChange} className='input-form max-h-20' />
            {touched.description && errors.description && <div className='text-sm text-red-500'>{errors.description}</div>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="address" className='font-semibold'>Address</label>
            <input type='text' name='address' value={values.address} onChange={handleChange} className='input-form' />
            {touched.address && errors.address && <div className='text-sm text-red-500'>{errors.address}</div>}
          </FormGroup>

          {/* Second five row forms */}
          <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 mt-4'>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.sell} id="sell" name='sell' onChange={handleChange} className='checkbox-design' />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.rent} id="rent" name='rent' onChange={handleChange} className='checkbox-design' />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className='flex gap-1'>
              <input type="checkbox" checked={values.furnished} id="furnished" name='furnished' onChange={handleChange} className='checkbox-design' />
              <label htmlFor="funished">Furnished</label>
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
              <input type='number' name='beds' value={values.beds} onChange={handleChange} className='input-form' />
              {touched.beds && errors.beds && <div className='text-sm text-red-500'>{errors.beds}</div>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="baths" className='font-semibold'>Baths</label>
              <input type='number' name='baths' value={values.baths} onChange={handleChange} className='input-form' />
              {touched.baths && errors.baths && <div className='text-sm text-red-500'>{errors.baths}</div>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="price" className='font-semibold'>Regular Price</label>
              <input type='number' name='regularPrice' value={values.regularPrice} onChange={handleChange} placeholder='0.00' className='input-form' />
              {touched.regularPrice && errors.regularPrice && <div className='text-sm text-red-500'>{errors.regularPrice}</div>}
            </FormGroup>
          </div>
        </div>
        {/* Last Form of Image upload */}
        <div className='flex flex-col w-full justify-center items-center'>
          <Title level={5} className='text-center font-medium'>Images: <span className='font-normal text-sm'>Upload max 6 images, the first one will be the cover</span> </Title>
          <div className='flex w-full gap-2 mt-5'>
            <input type='file' className='input-form' />
            <button className='py-2 px-2 rounded-lg font-bold text-white hover:bg-blue-600 transition-all duration-700 bg-blue-500'>Upload</button>
          </div>
          <button type='submit' onClick={handleSubmit} className="button-design bg-green-500 hover:bg-green-600 transition-all duration-700 font-semibold text-white">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateListing