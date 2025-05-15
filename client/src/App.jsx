import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import Profile from "./components/Profile";
import Navbar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";
import UserCart from "./components/UserCart";
import UserAccount from "./components/UserAccount";
import OrderSummary from "./components/OrderSummary";
import AddProductForm from "./components/AddProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import UserList from "./components/UserList";
import "./index.css"

function App() {

  const [searchParameter, setSearchParameter] = useState("");

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
      </Routes>

    </>
  )
}

export default App


/*function App() {

  return (
    <>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  )
}*/



