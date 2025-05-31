import React, { useContext } from 'react';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {productsFromDB} = useContext(ShopContext);
  const {productId} = useParams();
  const product = productsFromDB.find(e=> e.id === Number(productId))

  if (!product) {
    return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#333',
        animation: 'pulse 1.5s infinite',
        animationName: 'pulse'
      }}>
        Loading...
      </h1>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
    </div>);
  }
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product}/>
      <DescriptionBox />
      <RelatedProducts product={product}/>
    </div>
  );
}

export default Product;
