import React, { useContext } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {
  const { productsFromDB } = useContext(ShopContext);
  const womenProducts = productsFromDB.filter(p => p.category === 'women').slice(0, 4);

  return (
    <section className='popular'>
      <div className="popular-header">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
      </div>
      <div className="popular-item">
        {womenProducts.map((item) => (
          <Item 
            key={item.id}
            id={item.id} 
            name={item.title} 
            image={item.imageUrl} 
            new_price={item.newPrice} 
            old_price={item.oldPrice}
          />
        ))}
      </div>
    </section>
  );
}

export default Popular;