import React, { useContext } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const NewCollections = () => {
  const { productsFromDB } = useContext(ShopContext);
  const newCollections = [...productsFromDB].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <section className='new-collections'>
      <div className="new-collections-header">
        <h1>NEW COLLECTIONS</h1>
        <hr />
      </div>
      <div className="new-collections-item">
        {newCollections.map((item) => (
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

export default NewCollections;