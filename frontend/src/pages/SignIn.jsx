import React from 'react'
import { Typography } from 'antd'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormGroup from '../components/FormGroup'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../app/services/api'
import { signInSuccess, signInFailure } from '../app/reducers/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import GoogleAuth from '../components/GoogleAuth'


const validationSchema = yup.object().shape({
  email: yup.string().email('enter valid email address').required('email address is required'),
  password: yup.string().required('enter passwrd')
})

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { error, loading, currentUser } = useSelector(state => state.auth)
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        login(values).unwrap()
          .then(res => {
            dispatch(signInSuccess(res))
            // alert("Log in successfully");
            navigate('/')
          })
          .catch(er => {
            console.log(er);
            signInFailure(er)
          })
      } catch (error) {
        console.log(error)
        signInFailure(error);
      }
    }
  })

  const { values, errors, touched, handleChange, handleSubmit } = formik
  const { Title } = Typography
  return (
    <div className='flex max-w-xl h-full mx-auto mt-8 justify-center items-center px-5'>
      <div className='flex flex-col w-full'>
        <Title level={2} className='text-center'> Login </Title>
        <FormGroup>
          <label htmlFor='email' className='font-medium'>Email</label>
          <input type='email' className='input-form' name='email' value={values.email} onChange={handleChange} />
          {errors.email && touched.email && <div className='text-red-600 text-sm'>{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='password' className='font-medium'>password</label>
          <input type='password' className='input-form' name='password' value={values.password} onChange={handleChange} />
          {errors.password && touched.password && <div className='text-red-600 text-sm'>{errors.password}</div>}
        </FormGroup>
        <div>
          <button className='button-design bg-blue-500 text-white' disabled={isLoading} type='submit' onClick={handleSubmit}>{isLoading ? 'Loading' : 'Login'}</button>
          <GoogleAuth />
        </div>
      </div>
    </div>
  )
}

export default SignIn