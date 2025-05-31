import React, { useContext, useEffect, useState } from 'react'
import '../Pages/CSS/AdminPanel.css'
import { ShopContext } from '../Context/ShopContext';

function AdminPanel() {
    const [allUsers, setAllUsers] = useState([]);
    const [allCartItems, setAllCartItems] = useState(null);
    const {productsFromDBCart} = useContext(ShopContext);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch("https://localhost:7295/api/Admin/all-users", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });

            if (!response.ok) throw new Error("Something went wrong inside FetchAllUsers");

            const usersData = (await response.json()).data;
            setAllUsers(usersData);
            console.log(usersData);
            } catch (error) {
                console.log(error)
            }
        }

        const fetchAllCartItems = async () => {
            try {
                const response = await fetch("https://localhost:7295/api/Admin/all-cart-items", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });

            if (!response.ok) throw new Error("Something went wrong inside FetchAllCartItems");

            const cartData = (await response.json()).data;
            console.log(cartData);
            setAllCartItems(cartData);
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllUsers();
        fetchAllCartItems();
    }, [productsFromDBCart]);

    const localUser = JSON.parse(localStorage.getItem('currentUser'));
    const keys = localUser ? Object.keys(localUser) : [];

    const sampleCartItem = allCartItems ? allCartItems[0] : {};
    const cartKeys = Object.keys(sampleCartItem);

  return (
    <div className='admin-panel'>
        <div className='users-data'>
            <h1>Users Data</h1>
            <table>
                <thead>
                    <tr>
                        {keys.map((key) => (
                            <th key={key}>{key.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allUsers?.map((user, index) => (
                    <tr key={user.id}>
                        {keys.map((key) => (
                            <td>{user[key]}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className='cart-data'>
            <h1>Cart Data</h1>
            <table>
                <thead>
                    <tr>
                        {cartKeys?.map((key) => (
                            <th key={key}>{key.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allCartItems?.map((item, index) => (
                    <tr key={item.id}>
                        {cartKeys?.map((key) => (
                            <td>{item[key]}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminPanel