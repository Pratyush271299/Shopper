import React, { useContext, useEffect, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import getStripe from '../../library/getStripe';
import { toast } from 'react-toastify';
import all_product from '../Assets/all_product';

const CartItems = () => {
    const {
        all_product,
        cartItems,
        removeFromCart,
        getTotalCartAmount,
        discount,
        discountedTotal,
        setDiscount,
        setDiscountedTotal,
        productsFromDB,
        productsFromDBCart,
        setProductsFromDBCart,
        fetchCartItems,
    } = useContext(ShopContext);

    // const cartArray = [all_product, cartItems, removeFromCart, getTotalCartAmount, promocode, discount, discountedTotal];   
    const [promocode,setPromoCode] = useState('');

    const total = discountedTotal || getTotalCartAmount();
    let finalAmount = 0;

    if (total > 0 && total < 500) {
        finalAmount = total + 10;
    } else if (total >= 500) {
        finalAmount = total;
    } else {
        finalAmount = 0;
    }
    

    useEffect(() => {
        fetchCartItems();
    }, [])

    const handleInputChange = e => {
        setPromoCode(e.target.value);
    };

    const handleButtonClick = e => {
        const total = getTotalCartAmount();
        if (promocode === 'discount50' && getTotalCartAmount() > 0) {
            // alert('PROMO CODE HAS BEEN ENTERED!');
            // setDiscount(50);
            const appliedDiscount = 50;
            setDiscount(appliedDiscount);
            // const discountedAmount = total - discount;
            setDiscountedTotal(total - appliedDiscount);
            setPromoCode('');
            toast.success("DISCOUNT APPLIED")
        } else {
            toast.error("Invalid Code or empty cart");
            setPromoCode('');
        }
    };

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', { // Updated the fetch URL to a more typical format
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // Send relevant cart data
        });

        if (response.status === 500) {
            toast.error('Failed to initiate checkout');
            return;
        }

        const data = await response.json();
        toast.loading('LOADING...');
        const result = await stripe.redirectToCheckout({ sessionId: data.id });

        if (result.error) {
            toast.error(result.error.message);
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {productsFromDBCart?.map(e => {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.imageUrl} alt="" className='carticon-product-icon' />
                                <p>{e.title}</p>
                                <p>${e.price}</p>
                                <p>{e.size}</p>
                                <button className='cartitems-quantity'>{e.quantity}</button>
                                <p>${e.price * e.quantity}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e, e.size)} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>{getTotalCartAmount() >= 500 ? 'Free' : getTotalCartAmount() > 0 ? '$10' : '$0'}</p>
                        </div>
                        <hr/>
                        {discount > 0 && (
                            <>
                                <div className='cartitems-total-item'>
                                <p style={{color: 'green'}}><b>DISCOUNT APPLIED!</b></p>
                                <p style={{color: 'green'}}><b>-${discount}</b></p>
                                </div>
                                <hr />
                            </>
                            )}
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>
                            {
                                (() => {
                                const total = discountedTotal || getTotalCartAmount();
                                if (total > 0 && total < 500) return total + 10;
                                if (total >= 500) return total;
                                return 0;
                                })()
                            }
                            </h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' value={promocode} onChange={handleInputChange} />
                        <button onClick={handleButtonClick}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
