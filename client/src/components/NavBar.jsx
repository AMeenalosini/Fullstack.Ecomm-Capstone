/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom";
import gtLogo from '../assets/gtlogo.png';
import avatar from '../assets/avatar.png'; 
import cart from '../assets/cart.png'; 
import home from '../assets/home.png';
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";
import {  getUserid } from "../features/users/userDetailsSlice";
import { useUsercartQuery } from "../api/ecommApi";


function Navbar({ searchParameter, setSearchParameter }) {
const userId = useSelector(getUserid);

  const { data: cartData = [] } = useUsercartQuery(userId, {
    skip: !userId,  // Only run if user is logged in
  });

    // Calculate total items in cart
  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
    <div id="navbar" className="navbar">
      <img id="logo-image" src={gtLogo} alt="GildThread Logo" className="logo" />

      <Searchbar 
        searchParameter={searchParameter} 
        setSearchParameter={setSearchParameter} 
      />

      <div className="nav-links">
      <NavLink to="/" className="login-icon" title="Home">
        <img src={home} alt="home" className="avatar-img"/>
      </NavLink> 
      {!userId &&
        <NavLink to="/profile" className="login-icon" title="Login">
          <img src={avatar} alt="Login" className="avatar-img"/>
        </NavLink>
      }
      {userId &&
        <NavLink to="/account" className="login-icon" title="Login">
          <img src={avatar} alt="Login" className="avatar-img"/>
        </NavLink>
      }
          <NavLink to="/cart" className="login-icon" title="Cart">
            <div className="cart-icon-container">
              <img src={cart} alt="Cart" className="cart-icon" />
              {(userId && totalItems > 0) && (
                <span className="cart-item-count">{totalItems}</span>
              )}
            </div>
          </NavLink>
  
      </div>
    </div>
    <div className="category-nav">
        <NavLink to="/">All Products</NavLink>
        <NavLink to="/category/scarf">Scarf</NavLink>
        <NavLink to="/category/necklace">Necklace</NavLink>
        <NavLink to="/category/ring">Ring</NavLink>
        <NavLink to="/category/earring">Earring</NavLink>
      </div>
    </>
  );
} 

export default Navbar;


