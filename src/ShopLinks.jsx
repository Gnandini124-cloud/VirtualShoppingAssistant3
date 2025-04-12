import React from 'react';
import { Link } from 'react-router-dom'; 
import './Shop.css';
import { formatId } from './Utils';
import './ShopLinks.jsx';

const categories = [
  'Child Section',
  "Men's Wear",
  "Women's Wear",
  'Formal Wear',
  'Casual Wear',
  'Ethnic Dresses',
];

const ShopLinks = () => {
  return (
    <nav className="shop-links">
      {categories.map((category) => (
        <Link 
          key={category}
          to={`/shop#${formatId(category)}`} 
          className="shop-link"
        >
          {category}
        </Link>
      ))}
    </nav>
  );
};

export default ShopLinks;
