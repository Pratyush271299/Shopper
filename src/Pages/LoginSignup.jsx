import React, { useContext, useState } from 'react';
import './CSS/LoginSignup.css'
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setIsLogin} = useContext(ShopContext);
  const {user, setUser} = useContext(ShopContext);

  const navigate = useNavigate();

  const createUser = async () => {
    const payload = {
      id: 0,
      username: name,
      email: email,
      password: password
    }

    if (!name || !email || !password) {
      toast.error("Please fill all fields 😓");
      return;
    }

    try {
      const response = await fetch("https://localhost:7295/api/Login/signup-user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    //   if (!response.ok) throw new Error("something went wrong inside CreateUser");

    //   const responseData = await response.json();
    //   localStorage.setItem("currentUser", JSON.stringify(responseData.data));
    //   localStorage.setItem('token', JSON.stringify(responseData.token));
    //   setIsLogin(true);
    //   setUser(responseData.data);
    //   localStorage.setItem('isLoggedIn', 'true');
    //   toast.success(`Welcome to Shopper ${name} 😊`);
    //   navigate('/');
    // } catch (error) {
    //   setIsLogin(false);
    //   console.log(error);
    // }
      if (!response.ok) {
            const error = (await response.json()).errors;
            toast.error(error);
            throw new Error("Something went wrong inside CreateUSer")
          };
    
          const responseData = await response.json();
          localStorage.setItem("currentUser", JSON.stringify(responseData.data));
          localStorage.setItem("token", JSON.stringify(responseData.token));
          setIsLogin(true);
          localStorage.setItem('isLoggedIn', 'true');
          toast.success(`Welcome to Shopper ${name} 😊`);
          navigate('/');
      } catch (error) {
        console.log(error);
        setEmail('');
        setPassword('');
      }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' value={name} onChange={e => setName(e.target.value)}/>
          <input type="email" placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button onClick={createUser}>Continue</button>
        <p className='loginsignup-login'>
          Already have an account? <Link to={'/signin'} className='signinhere-button'><span>SignIn Here</span></Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Continuing, I agree to use the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;