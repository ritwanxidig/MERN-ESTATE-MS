import React from 'react'
import { Layout, Typography } from 'antd'
import SearchInput from '../components/SearchInput';
import ListingCard from '../components/ListingCard';
import { useDeleteListingMutation, useGetSearchListingsQuery } from '../app/services/api';

const Search = () => {
    const { Content, Footer, Header, Sider } = Layout;
    const { Title } = Typography;

    // way for deleting
    const [deleteListing, { isLoading: deleting }] = useDeleteListingMutation();

    // fetching data
    const { data, isFetching: loading } = useGetSearchListingsQuery(`search?searchTerm=&sort=regularPrice`);

    const headerStyle = {
        textAlign: 'center',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#fff',
    };
    const contentStyle = {
        textAlign: 'center',
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };
    const layoutStyle = {
        borderRadius: 0,
        overflow: 'hidden',
        width: '100%',
        // height: '89vh',
    };

    const handleRemoveListing = async (id) => {

        await deleteListing(id).unwrap()
            .then(res => { console.log(res); })
            .catch(er => { console.log(er); })

    }

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle} className='p-2'>
                <Title level={2}>Search Result</Title>
            </Header>
            <Layout>
                <Sider width="25%">
                    <div className='flex w-full h-full  bg-white p-4 '>
                        <div className="flex flex-col w-full gap-8">
                            <div className='flex gap-2'>
                                <label>Search Term: </label>
                                <input type='text' name='searchTerm' id='searchTerm' className='input-form' />
                            </div>
                            {/* Type & OFfer */}
                            <div className='grid md:grid-cols-5 gap-2 mt-5 items-center'>
                                <label htmlFor="type" className='font-semibold'>Type: </label>
                                <div className='flex gap-1 items-center'>
                                    <input type='checkbox' name='rent&sale' id='rent&sale' className='checkbox-design' />
                                    <label htmlFor="rent&sale">All</label></div>
                                <div className='flex gap-1 items-center'>
                                    <input type='checkbox' name='rent' id='rent' className='checkbox-design' />
                                    <label htmlFor="rent">Rent</label>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type='checkbox' name='sale' id='sale' className='checkbox-design' />
                                    <label htmlFor="sale">Sale</label>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type='checkbox' name='offer' id='offer' className='checkbox-design' />
                                    <label className='font-semibold' htmlFor='offer'>Offer</label>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className='grid md:grid-cols-4 gap-2 items-center'>
                                <label htmlFor="amenities" className='font-semibold'>Amenities: </label>
                                <div className='flex gap-1 items-center w-full'>
                                    <input type='checkbox' name='furnished' id='furnished' className='checkbox-design' />
                                    <label htmlFor="furnished">Furnished</label>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type='checkbox' name='parking' id='parking' className='checkbox-design' />
                                    <label htmlFor="parking">Parking</label>
                                </div>
                            </div>

                            {/* Sort */}
                            <div className='flex flex-col md:flex-row gap-2 items-center'>
                                <label htmlFor="sort" className='font-semibold'>Sort: </label>
                                <select name='sort' id='sort' className='input-form'>
                                    <option value='latest'>Latest</option>
                                    <option value='price-low-to-high'>Price: Low to High</option>
                                    <option value='price-high-to-low'>Price: High to Low</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div className='flex flex-col md:flex-row gap-2 items-center'>
                                <label htmlFor="location" className='font-semibold'>Location: </label>
                                <select name='location' id='location' className='input-form'>
                                    <option value='rajshahi'>Somaliland</option>
                                    <option value='dhaka'>Hargeisa</option>
                                    <option value='sylhet'>Buroa</option>
                                </select>
                            </div>

                            {/* Submit */}
                            <div className='flex justify-center'>
                                <button className='bg-blue-500 button-design text-white text-lg font-semibold'>Search</button>
                            </div>

                        </div>
                    </div>
                </Sider>
                <Content style={contentStyle}>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 flex-wrap sm:grid-cols-1 gap-4 p-4 grid-cols-1'>
                        {data && data?.length > 0 ? data?.map(listing => (
                            <ListingCard key={listing._id} listing={listing} handleRemoveListing={handleRemoveListing} deleting={deleting} />
                        )) : null}
                    </div>
                </Content>
            </Layout>
            <Footer style={footerStyle}>
                Footer
            </Footer>
        </Layout>
    )
}

export default Search