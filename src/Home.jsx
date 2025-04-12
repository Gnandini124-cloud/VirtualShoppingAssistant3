import React from "react";
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import { Link } from "react-router-dom";
import "./Home.css";
import ShopLinks from "./ShopLinks";
import {Navbar} from "./components/Navbar";
import hoodieImg from "./imgfolder/hoodie.jpg";
import Test from "./Test";
import jacketImg from "./imgfolder/jacket.jpg";
import jeansImg from "./imgfolder/jeans.jpg";
import tshirtImg from "./imgfolder/t-shirt.jpg";
import shoesImg from "./imgfolder/sneakers.jpg";
import shirtImg from "./imgfolder/shirt1.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chatbot from "./Chatbot";



// Navbar Component
<Navbar/>

// Home Component
const Home = () => {
  const products = [
    { id: 5, name: "Cool Hoodie", price: "$39.99", img: hoodieImg },
    { id: 1, name: "Stylish Jacket", price: "$59.99", img: jacketImg },
    { id: 2, name: "Casual T-Shirt", price: "$19.99", img: tshirtImg },
    { id: 3, name: "Classic Sneakers", price: "$79.99", img: shoesImg },
    { id: 4, name: "Trendy Jeans", price: "$49.99", img: jeansImg },
    { id: 6, name: "Casual Shirt", price: "$29.99", img: shirtImg },
  ];
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 relative">
 
       <ShopLinks/>


      {/* Hero Section */}
      <section  id="hero" className="text-center py-20 bg-cover bg-center bg-blue-800 text-black">
        <h2 className="text-4xl font-bold">Upgrade Your Style</h2>
        <p className="mt-4">Find the best fashion trends for you.</p>
        <Link to="/Shop">
          <button className="shop_now mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Shop Now
          </button>
        </Link>
      </section>


     {/* carousel component */}
     


     <section className="carousel-section py-10 px-4">
        <CCarousel controls indicators interval={1000} transition="fade" className="carousel_item">
          <CCarouselItem>
            <CImage className="carousel-img d-block w-100 h=100" src={shirtImg} alt="React Slide" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="carousel-img d-block w-100 h=100" src={shoesImg} alt="Vue Slide" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="carousel-img d-block w-100 h=100" src={hoodieImg} alt="Angular Slide" />
          </CCarouselItem>
        </CCarousel>
      </section>

      {/* Featured Products - Horizontal Scroll */}
      <section id="product_display" className="py-10 px-4">
        <h3 className="text-2xl font-bold text-center">Featured Products</h3>
        <div id="products" className="mt-6 overflow-x-auto whitespace-nowrap flex gap-6 px-4">
          {products.map((product) => (
            <div key={product.id} className="inline-block bg-white p-4 rounded-md shadow-md w-60 shrink-0">
              <img src={product.img} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
              <h4 className="mt-2 text-lg font-semibold">{product.name}</h4>
              <p className="text-gray-600">{product.price}</p>
              <button className="button mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Component */}
      
      {/* <VoicetextAssistant/> */}
      <Chatbot/>


      {/* Footer */}
  <footer id="footer" className="bg-indigo-950 text-white py-6 mt-10">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    {/* Left - Branding */}
    <div className="rights mb-4 md:mb-0">
      <h2 className="text-xl font-bold">Clothify</h2>
      <p className="text-sm text-gray-400">© {new Date().getFullYear()} Clothify. All rights reserved.</p>
    </div>

    {/* Center - Navigation */}
    <ul className="flex space-x-6 mb-4 md:mb-0">
      <li className="hover:text-blue-100 cursor-pointer">
        <Link to="/"> <span className="link-text">Home</span></Link>
      </li>
      <li className="hover:text-blue-100 cursor-pointer ">
        <Link to="/shop"> <span className="link-text">Shop</span></Link>
      </li>
      <li className="hover:text-blue-100 cursor-pointer ">
        <Link to="/contact"> <span className="link-text">Contact</span></Link>
      </li>
      <li className="hover:text-blue-100 cursor-pointer">
        <Link to="/register"> <span className="link-text">Sign Up</span></Link>
      </li>
    </ul>

    {/* Right - Social Media or Contact */}
    <div className="support text-sm text-gray-400">
      <p>Email: support@clothify.com</p>
      <p>Phone: +1 234 567 890</p>
    </div>
  </div>
</footer>
   <Test/>   

    </div>
    
    
  );
};

export default Home;
