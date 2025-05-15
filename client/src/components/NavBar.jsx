/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom";
import gtLogo from '../assets/gtlogo.png';
import avatar from '../assets/avatar.png'; 
import cart from '../assets/cart.png'; 
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";
import {  getUserid } from "../features/users/userDetailsSlice";


function Navbar({ searchParameter, setSearchParameter }) {
const userId = useSelector(getUserid);

  return (
    <div id="navbar" className="navbar">
      <img id="logo-image" src={gtLogo} alt="GildThread Logo" className="logo" />

      <Searchbar 
        searchParameter={searchParameter} 
        setSearchParameter={setSearchParameter} 
      />

      <div className="nav-links">
      <NavLink to="/">Home</NavLink> 
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
      <NavLink to="/cart" className="login-icon" title="cart">
          <img src={cart} alt="Cart"/>
      </NavLink>
  
      </div>
    </div>
  );
} 

export default Navbar;

/*
          <NavLink to="/user/cart" className="login-icon" title="cart">
          <img src={cart} alt="Cart"/>
      </NavLink>
      */