/*****************************************************************************************************************/
/****     This code is to DISPLAY the Navbar with logo, search bar, navigation icons, and category links      ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Fetch cart data based on logged-in user                                                            ***/
/** Step 3: Calculate total items in cart                                                                      ***/
/** Step 4: Display Navbar with logo, search bar, home/login/cart icons                                        ***/
/** Step 5: Display category-based navigation links                                                            ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code  ***/
import { NavLink } from "react-router-dom";                           
import gtLogo from '../assets/gtlogo.png';                            // GildThread logo                            
import avatar from '../assets/avatar.png';                            // Avatar/Login icon 
import cart from '../assets/cart.png';                                // Cart icon
import home from '../assets/home.png';                                // Home icon
import Searchbar from "./Searchbar";                                  // Custom search bar component
import { useSelector } from "react-redux";
import {  getUserid } from "../features/users/userDetailsSlice";      // Selector to get user ID from Redux
import { useUsercartQuery } from "../api/ecommApi";                   // Query to fetch user cart data

/** Step 2: Fetch cart data based on logged-in user **/
function Navbar({ searchParameter, setSearchParameter }) {
  const userId = useSelector(getUserid);                                // Get current user ID from Redux
  const { data: cartData = [] } = useUsercartQuery(userId, {
    skip: !userId,                                                    // Only run if user is logged in
  });
  /** Step 3: Calculate total items in cart **/
  const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);

  /** Step 4: Display Navbar with logo, search bar, home/login/cart icons   **/
  /** Step 5: Display category-based navigation links                       **/
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


