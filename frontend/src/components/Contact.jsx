import React from 'react'
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

import { useGetSingleUserQuery } from '../app/services/api'

const Contact = ({ listing }) => {
  const [message, setMessage] = React.useState('')
  const param = listing.userRef;
  const { data, isFetching: loading } = useGetSingleUserQuery(param);


  return (
    <div className='flex my-4'>
      <Spin spinning={loading}>
        <div className='flex flex-col w-full'>
          <p>
            Are you want to contact
            <span className='font-bold'>{data?.username}</span>
            ? for the listing <span className='font-bold'>{listing?.name}
            </span >
          </p>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='bg-white input-form border-2 shadow-lg border-white' placeholder='type your message' />
          <Link to={`mailto:${data?.email}?subject=Regarding ${listing.name}&body=${message}`} className='button-design bg-gray-700 text-white hover:shadow-lg transition-all  '>Send</Link>
        </div>
      </Spin>
    </div>
  )
}

export default Contact