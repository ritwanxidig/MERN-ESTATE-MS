import React from 'react'
import { useGetSingleListingQuery } from '../app/services/api'
import { useParams } from 'react-router';
import { Spin } from 'antd';
import { BiSolidMap } from "react-icons/bi";
import { FaBath, FaBed, FaParking } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import ImageSlider from '../components/ImageSlider'

// Swiper
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';


const SingleListing = () => {
  SwiperCore.use([Navigation]);
  const { id: listingId } = useParams();
  const { data: listing, isFetching: Loading } = useGetSingleListingQuery(listingId);
  // console.log(listing);
  return (
    <>
      <Spin spinning={Loading} fullscreen />
      <div className='flex flex-col w-full h-[90.5vh]'>
        <div className=''>
          <ImageSlider slides={listing?.imageUrls} SliderData={listing?.imageUrls} />
        </div>
        <div className='flex flex-col w-full h-full bg-gray-100 gap-4'>
          <div className='flex flex-col gap-2  mx-auto mt-12 w-4/5'>
            {/* name,price and address */}
            <h1 className='text-3xl font-bold'>{listing?.name || 'House Name'} - ${listing?.regularPrice.toLocaleString('en-US') || 'Price'} <span className='text-sm font-normal'>{listing?.type === 'rent' ? '/month' : ''} </span> </h1>
            <div className='flex items-center gap-1 my-2'>
              <BiSolidMap className='text-xl text-blue-600' />
              <p className='text-sm text-blue-600'>{listing?.address || 'House Address'}</p>
            </div>
            {/* type and offer */}
            <div className='flex items-center gap-1'>
              <button className='bg-blue-500 text-white px-12 py-1 rounded cursor-default'>For {listing?.type === 'rent' ? 'Rent' : 'Sale'}</button>
              {listing?.offer ? <button className='bg-green-500 text-white px-12 py-1 rounded cursor-default'><span className='line-through'>{listing.discountPrice?.toLocaleString('en-US')}</span> Off</button> : null}
            </div>
            {/* description */}
            <p className='text-sm text-slate-700'>{listing?.description || 'House Description'}</p>
            {/* additional info of the house */}
            <div className='flex w-full my-2 gap-3 items-center text-blue-600'>
              <div className="flex gap-1 items-center">
                <FaBed />
                <p className='text-sm  font-semibold'>{listing?.bedrooms || 0} Beds</p>
              </div>
              <div className="flex gap-1 items-center">
                <FaBath />
                <p className='text-sm  font-semibold'>{listing?.bathrooms || 0} Baths</p>
              </div>
              {listing?.parking ? (<div className="flex gap-1 items-center">
                <FaParking />
                <p className='text-sm  font-semibold'>Parking spot</p>
              </div>) : null}
              {listing?.furnished ? (<div className="flex gap-1 items-center">
                <AiFillHome />
                <p className='text-sm  font-semibold'>Furnished</p>
              </div>) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleListing