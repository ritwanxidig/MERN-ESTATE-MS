import FormGroup from '../components/FormGroup'
import { useSignUpMutation } from '../app/services/api'
import { Alert, Typography } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'



const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  email: yup.string().email('please insert valid email address').required('email is required'),
  password: yup.string().required('password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'password must match')
    .required('confirm password is required')
})

const SignUp = () => {

  const navigate = useNavigate();
  const [signUp, { }] = useSignUpMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { username, password, email } = values;
        await signUp({ username, email, password })
          .unwrap()
          .then(res => {
            alert("user created successfully");
            navigate('/sign-in')
          }).catch(err => console.log(err));
      } catch (error) {
        console.log(error)
      }
    }
  })

  const { values, errors, touched, handleChange, handleSubmit } = formik;



  const { Title } = Typography
  return (
    <div className='flex max-w-xl h-full mx-auto mt-8 justify-center items-center px-5'>
      <div className='flex flex-col w-full'>
        <Title level={2} className='text-center'>Sign Up </Title>
        <FormGroup>
          <label htmlFor="username" className='font-medium'>Username</label>
          <input type='text' name='username' value={values.username} onChange={handleChange} className='input-form' placeholder='e.g. ritwan' />
          {errors.username && touched.username && <div className='text-red-600'>{errors.username}</div>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='email' className='font-medium'>Email</label>
          <input type='text' name='email' value={values.email} onChange={handleChange} className='input-form' placeholder='e.g. ritwan@hotmail.com' />
          {errors.email && touched.email && <div className='text-red-600'>{errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='password' className='font-medium'>Password</label>
          <input type='password' name='password' value={values.password} onChange={handleChange} className='input-form' placeholder='********' />
          {errors.password && touched.password && <div className='text-red-600'>{errors.password}</div>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='confirmPassword' className='font-medium'>Confirm Password</label>
          <input type='password' name='confirmPassword' value={values.confirmPassword} onChange={handleChange} className='input-form' placeholder='********' />
          {errors.confirmPassword && touched.confirmPassword && <div className='text-red-600'>{errors.confirmPassword}</div>}
        </FormGroup>
        <div>
          <button className='button-design bg-green-500 text-white' type='submit' onClick={handleSubmit}>SignUp</button>
          <button className='button-design bg-blue-500 text-white'> Continue with Google</button>
        </div>
        <div className='flex w-full py-2 '>
          <p>Have an account?  <Link to='/sign-in' className='text-blue-500'> SignIn </Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp