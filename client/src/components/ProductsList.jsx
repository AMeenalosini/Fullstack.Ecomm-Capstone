import { useProductsQuery } from "../api/ecommApi";
// 👉 STEP 6 - Import `useNavigate` from React Router
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//component
import Searchbar from "./Searchbar";


function ProductsList() {
    const navigate = useNavigate();
    const [searchParameter, setSearchParameter] = useState("");
  
    const { data, error, isLoading } = useProductsQuery();
    
    console.log(data)
    console.log(error)

    if (isLoading) {
      return (
        <section>
          <h2>Loading...</h2>
        </section>
      );
    }
  
    if (error) {
      return (
          <section>
          <h2>Bummer, it broke. Try again in a bit.</h2>
        </section>
      );
    }
  
    const productsToDisplay =
      searchParameter !== "" && data
        ? data.filter(
            (product) =>
              product.description.toUpperCase().includes(searchParameter.toUpperCase()) 
          )
        : data;
  
    return (
      <section className="bookList">
        <Searchbar
          searchParameter={searchParameter}
          setSearchParameter={setSearchParameter}
        />
        {productsToDisplay.map((productObj) => (
          <div
            className="card"
            key={productObj.id}
            onClick={() => navigate(`/products/${productObj.id}`)}
          >
            <div
              className="img"
              style={{ backgroundImage: `url(${productObj.image_url})` }}
            />
            <h2>{productObj.description}</h2>
          </div>
        ))}
      </section>
    );
  }
  
  export default ProductsList;