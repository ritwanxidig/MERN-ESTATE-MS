import { Card, Image, Layout, Spin, Typography } from 'antd'
import React from 'react'


import { useDeleteListingMutation, useGetAllListingsQuery, useGetUserListingsQuery } from '../app/services/api'

import ListingCard from '../components/ListingCard';



const SpecificListings = () => {
  const { data, isFetching: Loading } = useGetUserListingsQuery();
  const [deleteListing, { isLoading: deleting }] = useDeleteListingMutation();
  const { Header, Content, Footer } = Layout;


  const handleRemoveListing = async (id) => {

    await deleteListing(id).unwrap()
      .then(res => { console.log(res); })
      .catch(er => { console.log(er); })

  }



  return (
    <Layout className='flex flex-col w-full bg-gray-100 h-[90.5vh]'>
      <Spin spinning={Loading} fullscreen />
      <Header className='bg-gray-100'>
        <h1 className='font-bold text-xl text-center'>  My Listings</h1>
      </Header>
      <Content className='bg-gray-100'>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 flex-wrap sm:grid-cols-1 gap-4 p-4 grid-cols-1">
          {data && data?.length > 0 ? data?.map(listing => (
            <ListingCard key={listing._id} listing={listing} handleRemoveListing={handleRemoveListing} deleting={deleting} />
          )) : null}
        </div>
      </Content >
      <Footer className='bg-gray-100'>
        ALSDJF
      </Footer>
    </Layout >
  )
}

export default SpecificListings 