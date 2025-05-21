/****************************************************************************************************************/
/****     This is the main APP component responsible for routing and rendering all core components           ****/
/****************************************************************************************************************/
/** Step 1: Import required dependencies and components                                                        **/
/** Step 2: Maintain shared state (e.g., search parameter) using useState                                      **/
/** Step 3: Render Navbar and define application routes using React Router                                     **/
/****************************************************************************************************************/

/** Step 1: Import dependencies **/
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
/** Step 1: Import application components **/
import ProductsList from "./components/ProductsList";
import Profile from "./components/Profile";
import Navbar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";
import UserCart from "./components/UserCart";
import UserAccount from "./components/UserAccount";
import OrderSummary from "./components/OrderSummary";
import AddProductForm from "./components/AddProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import Category from "./components/Category";
import UserList from "./components/UserList";
import "./index.css"

/** Step 2: Define main App component **/
function App() {

  const [searchParameter, setSearchParameter] = useState("");

  /** Step 3: Return JSX with Navbar and Routes **/
  return (
    <>
      <Navbar 
      searchParameter={searchParameter} 
      setSearchParameter={setSearchParameter} 
      />
      
      <Routes>
        <Route path="/" element={
          <ProductsList 
          searchParameter={searchParameter} 
          setSearchParameter={setSearchParameter} 
          />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        <Route path="/updateproduct/:id" element={<UpdateProductForm />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>

    </>
  )
}

export default App


