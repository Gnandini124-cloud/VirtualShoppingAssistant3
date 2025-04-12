import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { Navbar } from './components/Navbar';
import './App.css';
import { About, Contact } from './components/pages';
import '@coreui/coreui/dist/css/coreui.min.css';
import Cart from './components/pages/Cart';
import Shop from './Shop';
import ShopLinks from './ShopLinks';

function App() {
  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add item to cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to update item quantity in cart
  const handleUpdateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Function to remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  // Function to empty the cart
  const handleEmptyCart = () => {
    setCartItems([]);
  };

  return (
    <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/ShopLinks' element={<ShopLinks />} />
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home onAddToCart={handleAddToCart} />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/cart'
          element={
            <Cart
              cartItems={cartItems}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          }
        />
        <Route path='/home#footer' element={<Contact />} />
      </Routes>
    </Router>
  </React.StrictMode>
  );
}

export default App;
