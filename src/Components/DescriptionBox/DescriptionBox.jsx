import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <section className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <button 
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={`descriptionbox-nav-box fade ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (122)
        </button>
      </div>
      <div className="descriptionbox-content">
        {activeTab === 'description' && (
          <div className="descriptionbox-description">
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="descriptionbox-reviews">
            <p>Reviews content will be displayed here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DescriptionBox;