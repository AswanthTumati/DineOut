import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import './App.css';
import Search from './components/Search';
import { FoodContext } from './components/FoodContext';
import { useState } from 'react';
import FoodItems from './components/FoodItems';
import Navbar from './components/Navbar';
import CartPage from './components/CartPage';
//import Products from './components/Products';
//import PaymentPage from './components/PaymentPage';
import PaymentPageWrapper from './components/PaymentPage'; // Update the path accordingly
import OrderPlacedPage from './components/OrderPlacedPage';


function App() {
  let [searchItem, setSearchItem] = useState('');
  let [cartItems, setCartItems] = useState([]);

  return (
    <FoodContext.Provider value={{ searchItem, setSearchItem, cartItems, setCartItems }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPageWrapper />} /> 
          <Route path='/order-placed' element={<OrderPlacedPage/>}/>

        </Routes>
      </Router>
    </FoodContext.Provider>
  );
}

const Home = () =>(
  <div>
    <Search/>
    <FoodItems/>
  </div>
)

export default App;
