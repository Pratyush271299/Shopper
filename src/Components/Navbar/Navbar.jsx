import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import admin_logo from '../Assets/admin_logo.jpg';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const { 
        menu, 
        setMenu, 
        getTotalCartItems, 
        isLogin, 
        setIsLogin, 
        setCartItems, 
        setDiscount, 
        setDiscountedTotal 
    } = useContext(ShopContext);
    
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const isAdmin = JSON.parse(localStorage.getItem('currentUser'))?.email === 'pratyush@gmail.com';

    const handleLogout = () => {
        setIsLogin(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('productsFromCart');
        setCartItems({});
        setDiscount(0);
        setDiscountedTotal(0);
        if (isMobileView) {
            setIsMobileMenuOpen(false);
        }
    };

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
        if (isMobileView) {
            setIsMobileMenuOpen(false);
        }
    };

    // Close mobile menu when clicking on cart or any navigation action
    const handleMobileAction = () => {
        if (isMobileView) {
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth <= 768;
            setIsMobileView(mobileView);
            
            // Close menu when switching to desktop view
            if (!mobileView && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobileMenuOpen]);

    return (
        <nav className='navbar'>
            <div className="nav-logo">
                {isAdmin && (
                    <Link to='/admin'>
                        <img className='admin-logo' src={admin_logo} alt="Admin Dashboard" />
                    </Link>
                )}
                <Link to='/'>
                    <img onClick={() => handleMenuClick('shop')} src={logo} alt='Shopper Logo'/>
                </Link>
                {!isMobileView && <p>Shopper</p>}
            </div>
            
            {isMobileView && (
                <button 
                    className="hamburger" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    &#9776;
                </button>
            )}
            
            <div className={`nav-content ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
                <ul className="nav-menu">
                    <li onClick={() => handleMenuClick('home')}>
                        <Link to='/' className={menu === 'home' ? 'active' : ''}>Home</Link>
                    </li>
                    <li onClick={() => handleMenuClick('mens')}>
                        <Link to='/mens' className={menu === 'mens' ? 'active' : ''}>Men</Link>
                    </li>
                    <li onClick={() => handleMenuClick('womens')}>
                        <Link to='/womens' className={menu === 'womens' ? 'active' : ''}>Women</Link>
                    </li>
                    <li onClick={() => handleMenuClick('kids')}>
                        <Link to='/kids' className={menu === 'kids' ? 'active' : ''}>Kids</Link>
                    </li>
                    <li onClick={() => handleMenuClick('latestcollections')}>
                        <Link to='/latestcollections' className={menu === 'latestcollections' ? 'active' : ''}>Collections</Link>
                    </li>
                </ul>
                
                <div className='nav-login-cart'>
                    {!isLogin ? (
                        <>
                            <Link to='/signup' onClick={handleMobileAction}><button>SignUp</button></Link>
                            <Link to='/signin' onClick={handleMobileAction}><button>SignIn</button></Link>
                        </>
                    ) : (
                        <>
                            <Link to='/signin' onClick={handleMobileAction}>
                                <button className='logout-button' onClick={handleLogout}>Logout</button>
                            </Link>
                            {isLogin && (
                                <div className="cart-container" onClick={handleMobileAction}>
                                    <Link to='/cart'>
                                        <img 
                                            className={`cart-icon ${isCartPage ? 'active' : ''}`} 
                                            src={cart_icon} 
                                            alt="Cart"
                                        />
                                    </Link>
                                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;