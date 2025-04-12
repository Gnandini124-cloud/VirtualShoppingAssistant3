import React from 'react';
import { Link } from 'react-router-dom'
import './Shop.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { formatId } from './Utils';
import KidstshirtImg from './imgfolder/Kids_tshirt.webp';
import SlimshirtImg from './imgfolder/slimshirt.webp';
import FrockImg from './imgfolder/frock.webp';
import DenimjeansImg from './imgfolder/denimjeans.webp';
import FloraldressImg from './imgfolder/floral_img.jpg';
import HighWaistSkirtImg from './imgfolder/highwaistskirt.jpg';
import BlackblazarImg from './imgfolder/blackblazar.webp';
import FormaltrousersImg from './imgfolder/Formal trousers.webp';
import GraphicTshirtImg from './imgfolder/graphictshirt.webp';
import ChinoshortsImg from './imgfolder/chino_shorts.webp';
import KurtasetImg from './imgfolder/kurtaset.webp';
import SareeImg from './imgfolder/saree.webp';

// Sample product data
const products = [
  { id: 11, name: 'Kids T-Shirt & Shorts', category: 'Child Section', price: 25.99, image: KidstshirtImg },
  { id: 12, name: 'Little Girl Frock', category: 'Child Section', price: 29.99, image: FrockImg },
  { id: 11, name: 'Kids T-Shirt & Shorts', category: 'Child Section', price: 25.99, image: KidstshirtImg },
  { id: 12, name: 'Little Girl Frock', category: 'Child Section', price: 29.99, image: FrockImg },
  
  { id: 1, name: 'Slim Fit Shirt', category: "Men's Wear", price: 49.99, image: SlimshirtImg},
  { id: 2, name: 'Denim Jeans', category: "Men's Wear", price: 59.99, image: DenimjeansImg },
  { id: 1, name: 'Slim Fit Shirt', category: "Men's Wear", price: 49.99, image: SlimshirtImg},
  { id: 2, name: 'Denim Jeans', category: "Men's Wear", price: 59.99, image: DenimjeansImg },
  
  { id: 3, name: 'Floral Dress', category: "Women's Wear", price: 69.99, image: FloraldressImg  },
  { id: 4, name: 'High Waist Skirt', category: "Women's Wear", price: 39.99, image: HighWaistSkirtImg },
  { id: 3, name: 'Floral Dress', category: "Women's Wear", price: 69.99, image: FloraldressImg  },
  { id: 4, name: 'High Waist Skirt', category: "Women's Wear", price: 39.99, image: HighWaistSkirtImg },
 
  { id: 5, name: 'Black Blazer', category: 'Formal Wear', price: 89.99, image: BlackblazarImg },
  { id: 6, name: 'Formal Trousers', category: 'Formal Wear', price: 59.99, image: FormaltrousersImg },
  { id: 5, name: 'Black Blazer', category: 'Formal Wear', price: 89.99, image: BlackblazarImg },
  { id: 6, name: 'Formal Trousers', category: 'Formal Wear', price: 59.99, image: FormaltrousersImg },
 
  { id: 7, name: 'Graphic T-Shirt', category: 'Casual Wear', price: 29.99, image: GraphicTshirtImg },
  { id: 8, name: 'Chino Shorts', category: 'Casual Wear', price: 34.99, image: ChinoshortsImg },
  { id: 7, name: 'Graphic T-Shirt', category: 'Casual Wear', price: 29.99, image: GraphicTshirtImg },
  { id: 8, name: 'Chino Shorts', category: 'Casual Wear', price: 34.99, image: ChinoshortsImg },
  
  { id: 9, name: 'Kurta Set', category: 'Ethnic Dresses', price: 74.99, image: KurtasetImg },
  { id: 10, name: 'Saree with Blouse', category: 'Ethnic Dresses', price: 99.99, image: SareeImg },
  { id: 9, name: 'Kurta Set', category: 'Ethnic Dresses', price: 74.99, image: KurtasetImg },
  { id: 10, name: 'Saree with Blouse', category: 'Ethnic Dresses', price: 99.99, image: SareeImg },
  
  
 ];

const categories = [
  'Child Section',
  "Men's Wear",
  "Women's Wear",
  'Formal Wear',
  'Casual Wear',
  'Ethnic Dresses'
];

const ShopNow = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="shop-now">
      {categories.map((category) => (
        <div key={category} id={formatId(category)} className="category-section text-center">
          <h2>{category}</h2>
          <div className="products-grid">
            {products
              .filter((product) => product.category === category)
              .map((filteredProduct) => (
                <div key={filteredProduct.id} className="product-card">
                  <img src={filteredProduct.image} alt={filteredProduct.name} className="w-[200px] h-[200px] object-cover rounded-md"/>
                  <h3>{filteredProduct.name}</h3>
                  <p>${filteredProduct.price.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopNow;