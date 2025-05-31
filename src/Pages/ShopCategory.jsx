import React, { useContext } from 'react';
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';

const ProductsGridLoader = () => (
  <div style={{
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px 40px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  }}>
    <h1 style={{
      fontSize: '3rem',
      color: '#333',
      animation: 'pulse 1.5s infinite'
    }}>
      Loading Products...
    </h1>

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `}</style>
  </div>
);



const ShopCategory = (props) => {
  // const {all_product} = useContext(ShopContext);
  const {productsFromDB} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {productsFromDB.length === 0 ? <ProductsGridLoader/> : productsFromDB.map((item, i) => {
          if(props.category === item.category) {
            return (<Item 
                key={i} 
                id={item.id} 
                name={item.title} 
                image={item.imageUrl} 
                new_price={item.newPrice} 
                old_price={item.oldPrice}
            />)
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;