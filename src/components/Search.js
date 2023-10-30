import React, { useContext, useState } from 'react'
import { FoodContext } from './FoodContext';

const Search = () => {
    let [searchInput, setSearchInput] = useState('');
    const { setSearchItem} = useContext(FoodContext)
    let handleSearchText = (event)=>{
        setSearchInput(event.target.value)
        //console.log(searchInput)
    }

    let handleSearchForm = (event)=>{
        event.preventDefault();
        setSearchItem(searchInput);
        //console.log(searchInput)
    }
  return (
    <div>
        <div className='row justify-content-center my-3'>
            <div className='col-md-4'>
                <form className='d-flex' onSubmit={handleSearchForm}>
                    <input type='search' placeholder='search food' className='form-control rounded-pill' value={searchInput} onChange={handleSearchText}></input>
                    <button type='submit' className='btn btn-outline-warning rounded-pill mx-2'>Search</button>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default Search