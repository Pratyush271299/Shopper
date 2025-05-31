import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-content">
        <div className="footer-logo">
          <img src={footer_logo} alt="Shopper Logo" className="logo-img" />
          <p>SHOPPER</p>
        </div> 
        
        <nav className="footer-nav">
          <ul className='footer-links'>
            <li><a href="#">Company</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Offices</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            <a href="#" className="footer-icons-container">
              <img src={instagram_icon} alt="Instagram" />
            </a>
            <a href="#" className="footer-icons-container">
              <img src={pinterest_icon} alt="Pinterest" />
            </a>
            <a href="#" className="footer-icons-container">
              <img src={whatsapp_icon} alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ {new Date().getFullYear()} - All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;