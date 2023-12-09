import FormGroup from '../components/FormGroup'
import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const { Title } = Typography
  return (
    <div className='flex max-w-xl h-full mx-auto mt-8 justify-center items-center px-5'>
      <div className='flex flex-col w-full'>
        <Title level={2} className='text-center'>Sign Up </Title>
        <FormGroup>
          <label htmlFor="username" className='font-medium'>Username</label>
          <input type='text' className='input-form' placeholder='e.g. ritwan' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='email' className='font-medium'>Email</label>
          <input type='text' className='input-form' placeholder='e.g. ritwan@hotmail.com' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='password' className='font-medium'>Password</label>
          <input type='password' className='input-form' placeholder='********' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='confirmPassword' className='font-medium'>Confirm Password</label>
          <input type='confirmPassword' className='input-form' placeholder='********' />
        </FormGroup>
        <div>
          <button className='button-design bg-green-500 text-white'>SignUp</button>
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