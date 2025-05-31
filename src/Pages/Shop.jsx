import React, { useContext, useEffect } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import { ShopContext } from '../Context/ShopContext';

const Shop = () => {

  const {fetchCartItems, user,initializeCart} = useContext(ShopContext);

  useEffect(() => {
    const fetchedProducts = fetchCartItems();
    localStorage.setItem('productsFromCart', JSON.stringify(fetchedProducts));
    initializeCart();
  }, [])

  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
}

export default Shop;
