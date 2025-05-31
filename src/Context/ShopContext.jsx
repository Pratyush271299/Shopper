import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [discount, setDiscount] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [menu, setMenu] = useState("shop");
    const [isLogin, setIsLogin] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    const [productsFromDB, setProductsFromDB] = useState([]);
    const [productsFromDBCart, setProductsFromDBCart] = useState([]);
    // const [productForDB, setProductForDB] = useState({});
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cartItems");
        // console.log(saved)
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        const fetchAllProduct = async () => {
            try {
                const localData = JSON.parse(localStorage.getItem('allProducts'));
                if (localData && localData.length > 0) {
                    setProductsFromDB(localData);
                }
                const response = await fetch("https://localhost:7295/api/Product", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                if (!response.ok) throw new Error("something went wrong inside fetchAllProducts");

                const data = (await response.json()).data;

                localStorage.setItem("allProducts", JSON.stringify(data));
                const productsFromLocalStorage = JSON.parse(localStorage.getItem('allProducts'));

                setProductsFromDB(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllProduct();
    }, [])

    const getDefaultCart = async () => {
        let cart = {};
        for (let i = 1; i < productsFromDB.length+1; i++) {
            cart[i] = 0;
        }

        const data = await fetchCartItems();

        if (data) {
            for (let i = 0; i < data.length; i++) {
            cart[data[i].allProductId] = data[i].quantity
        }
        }

        return cart;
    }
    const initializeCart = async () => {
        if (productsFromDB.length > 0) {
            const defaultCart = await getDefaultCart();
            setCartItems(defaultCart);
            localStorage.setItem("cartItems", JSON.stringify(await getDefaultCart()));
        }
    };

    useEffect(() => {      
        initializeCart();
    }, [productsFromDB]);


    useEffect(() => {
        const setLoaclCart = async () => {
            localStorage.setItem("cartItems", JSON.stringify(await getDefaultCart()));
        }
        setLoaclCart();
    }, []);

    const AddProductToCart = async (product, updatedCart) => {
        const quantity = updatedCart[product.id];

        const user = JSON.parse(localStorage.getItem("currentUser"));

        const createPayload = {
            imageUrl: product.imageUrl,
            title: product.title,
            price: product.newPrice,
            quantity: quantity,
            total: product.newPrice * quantity,
            userId: user.id,
            allProductId: product.id
        };

        const updatePayload = {
            userId: user.id,
            allProductId: product.id,
            quantity: quantity,
            total: product.newPrice * quantity
        };

        const fetchProductByProductAndUserId = async () => {
            try {
                const response = await fetch(`https://localhost:7295/api/Cart/${product.id}/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                if (!response.ok) {
                    throw new Error("something went while fetching a product")
                };

                const data = (await response.json()).data;
                return data;
            } catch (error) {
                console.log(error);
            }
        }

        const fetchedProduct = await fetchProductByProductAndUserId();

        const url = fetchedProduct
        ? "https://localhost:7295/api/Cart/update-product"
        : "https://localhost:7295/api/Cart/add-new-product";

        const method = fetchedProduct? "PUT" : "POST";
        const payload = fetchedProduct? updatePayload : createPayload;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to ${method === 'POST' ? 'add' : 'update'} product in cart`);
            }

            console.log(`Product ${method === 'POST' ? 'added' : 'updated'} successfully`);
        } catch (error) {
            console.error("Error in AddProductToCart:", error);
        }

    }

    const RemoveProductFromCart = async (product, updatedCart) => {
        const quantity = updatedCart[product.allProductId];

        const user = JSON.parse(localStorage.getItem("currentUser"));

        const payload = {
            userId: user.id,
            allProductId: product.allProductId,
            quantity: quantity,
            total: product.price * quantity
        }

        const url = quantity < 1
        ? `https://localhost:7295/api/Cart/delete-product/${product.allProductId}`
        : `https://localhost:7295/api/Cart/update-product`;

        if (quantity < 1) {
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                if (!response.ok) throw new Error("Something went wrong inside RemoveProductFromCart Delete part");

                console.log(`Product with ID: ${product.id} was successfully removed`);
                setDiscount(0);
                setDiscountedTotal(0);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error("Something went wrong inside RemoveProductFromCart UpdatePart");

                console.log(`Product reduced successfully`);
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    const fetchCartItems = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('currentUser')).id;
                const response = await fetch(`https://localhost:7295/api/Cart/all-cart-items/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });

                if (!response.ok) {
                    const emptyData = (await response.json()).data;
                    setProductsFromDBCart(emptyData);
                    localStorage.setItem('productsFromCart', JSON.stringify(emptyData));
                    throw new Error("Something went wrong inside FetchCartItems");
                }

                const data = (await response.json()).data;
                localStorage.setItem('productsFromCart', JSON.stringify(data));
                setProductsFromDBCart(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }

    const addToCart = async (product) => {
        const updatedCart = {
            ...cartItems, 
            [product.id]: (cartItems[product.id] || 0) + 1,
        };
        
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        
        await AddProductToCart(product, updatedCart);

        const fetchedProducts = await fetchCartItems();

        localStorage.setItem('productsFromCart', JSON.stringify(fetchedProducts));

        setDiscountedTotal(getTotalCartAmount() - discount);
    } 

    const removeFromCart = async (product) => {
        console.log(cartItems)
        const updatedCart = {
            ...cartItems,
            [product.allProductId]: cartItems[product.allProductId] - 1,
        };
        // console.log(updatedCart)
        setCartItems(updatedCart);
        localStorage.setItem('cartItems',JSON.stringify(updatedCart));

        await RemoveProductFromCart(product, updatedCart);

        const fetchedProducts = await fetchCartItems();

        localStorage.setItem('productsFromCart', JSON.stringify(fetchedProducts));

        setDiscountedTotal(getTotalCartAmount() - discount);

        if (getTotalCartAmount() <= 0) {
            setDiscountedTotal(0);
            setDiscount(0);
        }
    }

    const getTotalCartAmount = () => {
        const storedLocalCart = localStorage.getItem('productsFromCart');
        if (!storedLocalCart) return 0;

        let currentCartProducts;
        try {
            currentCartProducts = JSON.parse(storedLocalCart);
        } catch (error) {
            console.error('Failed to parse productsFromCart:', error);
            return 0;
        }
        let totalAmount = 0;
        for (let i = 0; i < currentCartProducts.length; i++) {
            totalAmount += currentCartProducts[i].total;
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        const data = localStorage.getItem('productsFromCart');
        if (!data) return 0;

        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed.length : 0;
        } catch (error) {
            console.error('Failed to parse from productsFromCart', error);
            return 0;
        }
    };
    
    const contextValue = {
        menu, setMenu, all_product, cartItems, 
        addToCart, removeFromCart, getTotalCartAmount, 
        getTotalCartItems, discountedTotal, discount, setDiscount, setDiscountedTotal,
        productsFromDB, setProductsFromDB,
        productsFromDBCart, setProductsFromDBCart,
        isLogin, setIsLogin, fetchCartItems, setCartItems,initializeCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
