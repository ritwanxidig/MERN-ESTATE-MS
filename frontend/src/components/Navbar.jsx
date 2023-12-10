import React from 'react'
import { Avatar, Input } from 'antd'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'


const Navbar = () => {
    const { currentUser } = useSelector(state => state.auth)
    return (
        <nav
            className="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 px-4 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">

                <div>
                    <Link
                        className=" my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
                        to='/'>
                        <h1 className='text-xl font-bold text-blue-600'>
                            HR <span className='text-blue-400'>Ritwan</span>
                        </h1>
                    </Link>
                </div>

                <div className='flex gap-2 items-center'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Input placeholder='Search' />
                </div>

                <div className='flex gap-4'>
                    {currentUser && Object.keys(currentUser).length > 0 ?
                        <Link to='/profile'>
                            <Avatar size={'default'} src={currentUser.avatar} />
                        </Link>
                        :
                        <Link
                            to='/sign-up'
                            className='bg-blue-500 rounded-full px-4 py-1 text-white '
                        >SignUp</Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar