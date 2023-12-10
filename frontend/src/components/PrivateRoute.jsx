import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router'

const PrivateRoute = () => {
    const { currentUser } = useSelector(state => state.auth)
    return currentUser && Object.keys(currentUser).length > 0
        ?
        <Outlet />
        :
        <Navigate to='/sign-in' />
}

export default PrivateRoute