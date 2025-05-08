import gtLogo from './assets/gtlogo.png'
import { Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
//import Profile from "./components/Profile";
//import Navbar from "./components/NavBar";
//import BookDetail from "./components/BookDetail";
//import Account from "./components/Account";
import "./index.css"

function App() {

  return (
    <>
      <h1><img id='logo-image' src={gtLogo}/>GildThread App</h1>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>

    </>
  )
}

export default App


