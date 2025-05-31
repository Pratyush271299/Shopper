import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';

const ProductsGridLoader = ({ isMobileMenuOpen }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: isMobileMenuOpen ? 1 : 2,
    pointerEvents: isMobileMenuOpen ? 'none' : 'auto'
  }}>
    <div style={{
      backgroundColor: '#fff',
      padding: '20px 40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#333',
        animation: 'pulse 1.5s infinite',
        margin: 0
      }}>
        Loading Products...
      </h1>
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `}</style>
  </div>
);

const ShopCategory = (props) => {
  const { productsFromDB } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter products by category
  const filteredProducts = productsFromDB.filter(item => props.category === item.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{filteredProducts.length > 12 ? 12 : filteredProducts.length}</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {productsFromDB.length === 0 ? 
          <ProductsGridLoader isMobileMenuOpen={isMobileMenuOpen} /> : 
          filteredProducts.map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.title} 
              image={item.imageUrl} 
              new_price={item.newPrice} 
              old_price={item.oldPrice}
            />
          ))
        }
      </div>
      {filteredProducts.length > 12 && (
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      )}
    </div>
  );
}

export default ShopCategory;