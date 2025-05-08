/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom";
//import { useSelector } from "react-redux";
//import {  getUserid } from "../features/users/userDetailsSlice";

function Navbar() {
//const userId = useSelector(getUserid);

  return (
    <div id="navbar" className="nav-links">
      <NavLink to="/">Home</NavLink> 
    </div>
  );
} 

export default Navbar;

/*
      {!userId && <NavLink to="/profile">Profile</NavLink>}
      {userId && <NavLink to="/account">Account</NavLink>}
      */