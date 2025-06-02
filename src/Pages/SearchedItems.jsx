import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

function SearchedItems() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query').toLowerCase() || '';
    // console.log(searchQuery);

    const {productsFromDB} = useContext(ShopContext);
    const filteredProducts = productsFromDB?.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
  return (
    <div className='allcollections'>
      <div className='allcollections-header'>
        <h1>Search Results..</h1>
        <hr />
      </div>
      <div className="allcollections-items">
        {filteredProducts.map((item, i) => {
            return (<Item 
            key={i} 
            id={item.id} 
            name={item.title} 
            image={item.imageUrl} 
            new_price={item.newPrice} 
            old_price={item.oldPrice}
            />)
        })}
      </div>
    </div>
  )
}

export default SearchedItems