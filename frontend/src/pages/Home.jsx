import React from 'react'


import { useDeleteListingMutation, useGetAllListingsQuery } from '../app/services/api'
import ListingCard from '../components/ListingCard';

const Home = () => {
  const { data, isFetching: loading } = useGetAllListingsQuery();
  const [deleteListing, { isLoading: deleting }] = useDeleteListingMutation();

  const handleRemoveListing = async (id) => {

    await deleteListing(id).unwrap()
      .then(res => { console.log(res); })
      .catch(er => { console.log(er); })

  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 flex-wrap sm:grid-cols-1 gap-4 p-4 grid-cols-1'>
      {data && data?.length > 0 ? data?.map(listing => (
        <ListingCard key={listing._id} listing={listing} handleRemoveListing={handleRemoveListing} deleting={deleting} />
      )) : null}
    </div>
  )
}

export default Home