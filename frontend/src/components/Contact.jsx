import React from 'react'
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

import { useGetSingleUserQuery } from '../app/services/api'
import { useSelector } from 'react-redux';

const Contact = ({ listing, setContact }) => {
  const [message, setMessage] = React.useState('')
  const param = listing.userRef;
  const { data, isFetching: loading } = useGetSingleUserQuery(param);
  const { currentUser } = useSelector(state => state.auth)


  return (
    <div className='flex my-4'>
      <Spin spinning={loading}>
        <div className='flex flex-col w-full'>
          {!currentUser ? (
            <Link to='/sign-in'>
              <p>Sign In to contact the owner of this property.</p>
            </Link>
          ) : (
            <>
              <p>
                Are you want to contact
                <span className='font-bold'>{data?.username}</span>
                ? for the listing <span className='font-bold'>{listing?.name}
                </span >
              </p>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='bg-white input-form border-2 shadow-lg border-white' placeholder='type your message' />
              <Link onClick={() => setContact(false)} to={`mailto:${data?.email}?subject=Regarding ${listing.name}&body=${message}`} className='button-design bg-gray-700 text-white hover:shadow-lg transition-all'>Send</Link>
            </>
          )}
        </div>
      </Spin>
    </div>
  )
}

export default Contact