import { Input, Typography } from 'antd'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import SpecificListings from './pages/SpecificListings'
import EditListing from './pages/EditListing'
import SingleListing from './pages/SingleListing'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/listings/add' element={<CreateListing />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/listings' element={<SpecificListings />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/listings/edit/:id' element={<EditListing />} />
        </Route>

        <Route path='/listings/:id' element={<SingleListing />} />

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App