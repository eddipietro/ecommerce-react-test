import React, { useState } from "react";
import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";
import { Link } from "react-router-dom";
// import { db } from "../../firebase/firebase";
// import { getDocs, collection } from "firebase/firestore";



const categories = [
  {
    id: 1,
    path: "/category/Casamientos",
    name: "Casamientos",
  },  {
    id: 2,
    path: "/category/Cumpleaños",
    name: "Cumpleaños",
  },
  {
    id: 3,
    path: "/category/Despedidas",
    name: "Despedidas",
  },
  {
    id: 4,
    path: "/category/Baby Showes",
    name: "Baby Showes",
  }, 
   {
    id: 5,
    path: "/category/Festivales",
    name: "Festivales",
  }, 
  {
    id: 6,
    path: "/category/Nosotros",
    name: "Nosotros",
  },  
  {
    id: 7,
    path: "/category/Contacto",
    name: "Contacto",
  }

  
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className={`nav ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container" id="nav-container">
        <Link to="/">
          <img className="logo" src="./karen-logo.png" alt="karenRomeroPH" />
        </Link>

        <div className={`nav-icons ${menuOpen ? 'center-menu' : ''}`}>
          <button className="menu-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <CartWidget className="cart-icon"  id="cart-icon" />
        </div>

        <div className={`nav-items ${menuOpen ? 'show-menu' : ''}`}>
          <ul className="nav">
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={category.path}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NavBar;