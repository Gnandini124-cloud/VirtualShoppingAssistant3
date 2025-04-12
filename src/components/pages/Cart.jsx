import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'; // Assuming you have a CSS file for styling
import { FaShoppingCart } from 'react-icons/fa';

const Cart = ({ cartItems = [], onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => { // Provide a default value for cartItems
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems]);

  const handleEmptyCart = () => {
    onEmptyCart();
  };

  return (
    <div className="cart">
      <h2 className="text-center">Shopping Cart</h2>
      {cartItems.length === 0 ? ( // Add a null or undefined check for cartItems
        <p className="text-center">Your cart is empty.<FaShoppingCart style={{ marginLeft: '8px' }} /> <Link to="/Shop">Start shopping</Link></p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <div>
                    <button onClick={() => onUpdateCartQty(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateCartQty(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-actions">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button onClick={handleEmptyCart}>Empty Cart</button>
            <button><Link to="/checkout">Proceed to Checkout</Link></button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
