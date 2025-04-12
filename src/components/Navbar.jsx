import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import { HomeIcon, PhoneIcon, UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return <nav>
        <li><Link to="/" className='title'>Shopify</Link></li>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
            }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li><NavLink to="/home"><HomeIcon className="icon-small" />Home</NavLink></li>
            <li><NavLink to="/register"><UserIcon className="icon-small" />SignUp</NavLink></li>
            <li><NavLink to="/cart"><ShoppingCartIcon className="icon-small" />Cart</NavLink></li>
            <li><NavLink to="/home#footer"><PhoneIcon className="icon-small" />Contact</NavLink></li>

        </ul>
        </nav>
}   