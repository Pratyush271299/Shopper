import React, { useContext } from 'react';
import './AlsoCheckout.css'
import all_product from '../Assets/all_product';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const AlsoCheckout = () => {
  const {productsFromDB} = useContext(ShopContext);

    const shuffledProducts = [...productsFromDB].sort(() => Math.random() - 0.5);
  return (
    <div className='alsocheckout'>
      <h1>ALSO CHECKOUT!</h1>
      <hr />
      <div className="alsocheckout-items">
        {shuffledProducts.slice(0, 16).map((item, i) => {
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

export default AlsoCheckout;
