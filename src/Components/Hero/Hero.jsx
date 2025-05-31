import React, { useContext } from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Hero = () => {
  const { setMenu } = useContext(ShopContext);
  
  return (
    <section className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY!</h2>
        <div className="hero-text-content">
          <div className='hero-hand-icon'>
            <p>new</p>
            <img src={hand_icon} alt='waving hand icon' />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <Link 
          to={'/latestcollections'} 
          className="hero-link"
          onClick={() => setMenu('latestcollections')}
        >
          <div className="hero-latest-btn">
            <span>latest collection</span>
            <img src={arrow_icon} alt="arrow icon" />
          </div>
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="fashion models" className="hero-image" />
      </div>
    </section>
  );
}

export default Hero;