import React, { useContext, useState } from 'react';
import './CSS/LoginSignIn.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginSignIn = () => {
  const {setIsLogin} = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useContext(ShopContext);

  const navigate = useNavigate();

  const signInUser = async () => {
    if (!email || !password) {
      toast.error("Please fill all the details 😓");
      return;
    }

    const payload = {
      email: email,
      password: password
    }

    try {
      const response = await fetch("https://localhost:7295/api/Login/signin-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = (await response.json()).errors;
        toast.error(error);
         throw new Error("Something went wrong inside signInUser")
      };

      const responseData = await response.json();
      localStorage.setItem("currentUser", JSON.stringify(responseData.data));
      localStorage.setItem("token", JSON.stringify(responseData.token));
      setIsLogin(true);
      localStorage.setItem('isLoggedIn', 'true');
      toast.success(`Welcome back ${responseData.data.username} 😊`);
      navigate('/');
    } catch (error) {
      console.log(error);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className='loginsignip'>
      <div className="loginsignin-container">
        <h1>Sign In</h1>
        <div className="loginsignin-fields">
          <input type="email" placeholder='Your Email' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button onClick={signInUser}>Continue</button>
      </div>
    </div>
  );
}

export default LoginSignIn;