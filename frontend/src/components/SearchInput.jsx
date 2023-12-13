import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);


  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');
    if (searchTerm) {
      setSearchValue(searchTerm);
    }
  }, [location.search])



  const handleChange = (e) => {
    setSearchValue(e.target.value);
    urlParams.set('searchTerm', e.target.value);
    navigate(`/search?${urlParams.toString()}`);
  }
  return (
    <input type='text' className='input-form border-2 border-gray-300 focus:border-0 shadow-md' placeholder='Search Lising...' value={searchValue} onChange={handleChange} />
  )
}

export default SearchInput