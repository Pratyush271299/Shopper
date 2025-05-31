import React, { useContext } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const RelatedProducts = ({ product }) => {
  const { productsFromDB } = useContext(ShopContext);
  
  // Filter related products (same category, different ID)
  const relatedProducts = productsFromDB
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  // Don't render if no related products found
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item) => (
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
    </div>
  );
}

export default RelatedProducts;