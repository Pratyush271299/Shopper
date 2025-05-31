import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (regex.test(email)) {
      alert('THANK YOU FOR SUBSCRIBING!');
      setIsSubscribed(true);
      setEmail('');
    } else {
      alert('Please enter a valid email address!');
    }
  }

  return (
    <section className='newsletter'>
      <div className="newsletter-content">
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input 
            type="email" 
            placeholder='Your Email Id' 
            value={email}
            onChange={handleEmailChange}
            required
            disabled={isSubscribed}
          />
          <button 
            type="submit"
            className={isSubscribed ? 'subscribed' : 'subscribe'}
            disabled={isSubscribed}
          >
            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsLetter;