import React, { useContext } from 'react';
import './AllCollections.css'
// import all_product from '../Assets/all_product';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const AllCollections = () => {
    const {productsFromDB} = useContext(ShopContext);
    const shuffledProducts = [...productsFromDB].sort(()=> Math.random() - 0.5);
  return (
    <div className='allcollections'>
      <div className='allcollections-header'>
        <h1>LATEST COLLECTIONS!</h1>
        <hr />
      </div>
      <div className="allcollections-items">
        {shuffledProducts.map((item, i) => {
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
  );
}

export default AllCollections;
