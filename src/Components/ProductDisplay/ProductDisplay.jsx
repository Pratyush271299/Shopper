import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, productsFromDBCart, fetchCartItems } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {[1, 2, 3, 4].map((item, index) => (
                        <img 
                            key={index} 
                            src={product.imageUrl} 
                            alt={`Product view ${index + 1}`} 
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img 
                        className='productdisplay-main-img' 
                        src={product.imageUrl} 
                        alt={product.title} 
                    />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.title}</h1>
                <div className="productdisplay-right-stars">
                    {[1, 2, 3, 4].map((star) => (
                        <img key={star} src={star_icon} alt="star rating" />
                    ))}
                    <img src={star_dull_icon} alt="unfilled star" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.oldPrice}</div>
                    <div className="productdisplay-right-price-new">${product.newPrice}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description || "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div 
                                key={size}
                                className={selectedSize === size ? 'selected-size' : ''}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <button 
                    onClick={() => {
                        if (!selectedSize) {
                            alert('Please select a size first');
                            return;
                        }
                        addToCart({...product, selectedSize});
                    }}
                    disabled={!selectedSize}
                >
                    ADD TO CART
                </button>
                <p className='productdisplay-right-category'>
                    <span>Category: </span>
                    {product.category || "Women, T-Shirt, Crop Top"}
                </p>
                <p className='productdisplay-right-category'>
                    <span>Tags: </span>
                    {product.tags || "Modern, Latest"}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;