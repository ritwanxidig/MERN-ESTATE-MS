import { Card, Image, Layout, Spin, Typography } from 'antd'
import React from 'react'
import { FaBath, FaBed, FaDollarSign, FaEye, FaParking } from "react-icons/fa";
import { BiSolidOffer, } from "react-icons/bi";
import { FaSalesforce, FaEdit, FaTrash } from "react-icons/fa";
import { AiFillHome, } from "react-icons/ai";

import { useDeleteListingMutation, useGetAllListingsQuery } from '../app/services/api'
import Meta from 'antd/es/card/Meta';


import { Link } from 'react-router-dom'



const SpecificListings = () => {
  const { data, isFetching: Loading } = useGetAllListingsQuery();
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
            <Spin spinning={deleting} key={listing._id}>
              <Card
                actions={[
                  <Link to={`/listings/edit/${listing._id}`}><FaEdit key="edit" className='ml-12' /></Link>,
                  <Link to={`/listings/${listing._id}`}> <FaEye key="eye" className='ml-12' /></Link>,
                  <button onClick={() => handleRemoveListing(listing._id)}><FaTrash key="trash" className='ml-12' /></button>,
                ]}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px'
                  }}
                  src={listing?.imageUrls[0]} />
                <div className='h-24'>
                  <Meta title={listing.name} description={listing.description.length > 80 ? listing.description.substring(0, 100) + "..." : listing.description} />
                </div>
                <div className='grid grid-cols-3 gap-2 w-full h-20 py-4'>
                  <div className='flex gap-1 items-center'>
                    <FaBed />
                    <Typography.Text className='text-[12px]'>{listing.bedrooms} Rooms</Typography.Text>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <FaBath />
                    <Typography.Text className='text-[12px]' >{listing.bathrooms} Baths </Typography.Text>
                  </div>
                  {listing.parking ? (<div className='flex gap-1 items-center'>
                    <FaParking />
                    <Typography.Text className='text-[12px]'>Parking</Typography.Text>
                  </div>) : null}
                  {listing.furnished ? (<div className='flex gap-1 items-center'>
                    <AiFillHome />
                    <Typography.Text className='text-[12px]'>Furnished</Typography.Text>
                  </div>) : null}

                  {listing.offer ? (
                    <div className='flex gap-1 items-center'>
                      <BiSolidOffer />
                      <Typography.Text className='text-[12px] line-through'>{listing.discountPrice}</Typography.Text>
                    </div>
                  ) : null}
                  {<div className='flex gap-1 items-center'>
                    <FaSalesforce />
                    <Typography.Text className='text-[12px]'>{listing.type === 'rent' ? 'Rent' : 'Sale'}</Typography.Text>
                  </div>}

                  <div className='flex gap-1 items-center'>
                    <FaDollarSign />
                    <Typography.Text className='text-[12px]'>{listing.regularPrice.toLocaleString('en-US', { minimumIntegerDigits: 2 })} {listing.type === 'rent' ? ' / Month' : ''} </Typography.Text>
                  </div>
                </div>
              </Card>
            </Spin>
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