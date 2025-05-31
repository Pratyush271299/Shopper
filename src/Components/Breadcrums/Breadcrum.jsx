import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
    const { product } = props;
    
    return (
        <nav className='breadcrum' aria-label="Breadcrumb">
            <ol className="breadcrum-list">
                <li className="breadcrum-item">
                    <Link to={'/'} className="breadcrum-link">Home</Link>
                </li>
                <li className="breadcrum-item">
                    <img src={arrow_icon} alt="" className="breadcrum-arrow" />
                </li>
                <li className="breadcrum-item">
                    <Link to={`/${product.category}s`} className="breadcrum-link">
                        {product.category}
                    </Link>
                </li>
                <li className="breadcrum-item">
                    <img src={arrow_icon} alt="" className="breadcrum-arrow" />
                </li>
                <li className="breadcrum-item breadcrum-current">
                    {product.title}
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrum;