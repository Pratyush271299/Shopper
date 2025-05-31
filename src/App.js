import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import LatestCollections from './Pages/LatestCollections';
import CollegeStudents from './Components/CollegeStudents/CollegeStudents';
import { DemoStudents } from './Components/DemoStudents/DemoStudents';
import LoginSignIn from './Pages/LoginSignIn';
import { ToastContainer } from 'react-toastify';
import all_product from './Components/Assets/all_product';
import { useContext, useEffect } from 'react';
import { ShopContext } from './Context/ShopContext';
import AdminPanel from './Pages/AdminPanel';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route path='/mens' element={<ShopCategory banner ={men_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
        <Route path='/latestcollections' element={<LatestCollections />} />
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>} />
        </Route>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/signup' element={<LoginSignup/>} />
        <Route path='signin' element={<LoginSignIn/>} />
        <Route path='/admin' element={<AdminPanel/>} />
      </Routes>
      <Footer />
      <ToastContainer position='top-center' autoClose={2000}/>
      </BrowserRouter>
      {/* <CollegeStudents /> */}
      {/* <DemoStudents/> */}
    </div>
  );
}

export default App;