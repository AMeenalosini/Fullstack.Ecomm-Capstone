/*****************************************************************************************************************/
/****     This code is to FETCH the "products" based on the CATEGORY                                          ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Create a "Category" component to display products by selected category                             ***/
/** Step 3: Render product cards if data is successfully fetched                                               ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code **/    
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductbycatQuery } from '../api/ecommApi';
import { useNavigate } from "react-router-dom"; 

/** Step 2: Create a "Category" component to display products by selected category **/

const Category = () => {
  const { category } = useParams();                                             // Get category from route parameters
  const navigate = useNavigate();                                               // Hook to navigate to product detail page
  const { data: products, isLoading, error } = useProductbycatQuery(category);  // Fetch products based on category

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

/** Step 3: Render product cards if data is successfully fetched **/
  return (
   <section>
        <div 
        style={{ display: "flex", marginBottom: "1.5rem", justifyContent: "space-between", alignItems: "center", padding: "0 2rem",}}
        ></div>
        <div className="product-list-container" >
        {products.map((productObj) => (
          <div
            className="product-card"
            key={productObj.id}
            onClick={() => navigate(`/products/${productObj.id}`)}
          >
            <div className="product-image-box">
                <img className="product-image" src={productObj.image_url} alt={productObj.description} />
            </div>
             <div className="product-info-box">
                <h3 className="product-description">{productObj.description}</h3>
                <p className="product-price">₹ {productObj.price}</p>
              </div>
          </div>
        ))}
        </div>
      </section>
  );
};

export default Category;
