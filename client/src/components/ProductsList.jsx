import { useProductsQuery, useDeleteproductMutation } from "../api/ecommApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
//component
import Searchbar from "./Searchbar";


function ProductsList({searchParameter, setSearchParameter}) {

    const navigate = useNavigate();
    const userDetails = useSelector(getUserDetails);
    const [deleteProduct] = useDeleteproductMutation();

    console.log("userDetails", userDetails)
  
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

    const handleDelete = async (id) => {
            try {
              await deleteProduct(id).unwrap(); 
              console.log("Product deleted successfully");
            } catch (err) {
              console.error("Failed to delete product:", err);
              alert("Failed to delete product");
          }
        };

    
  
    return (
      <section>
        <div 
        style={{ display: "flex", marginBottom: "1.5rem", justifyContent: "space-between", alignItems: "center", padding: "0 2rem",}}
        >
        {userDetails.is_admin && (
              <button onClick={() => {
                navigate(`/addproduct`);
              }}>
              AddProduct
            </button>
        )}
        {userDetails.is_admin && (
              <button onClick={() => {
                navigate(`/userlist`);
              }}>
              UserList
            </button>
        )}
        </div>
        <div className="product-list-container">
          {productsToDisplay.map((productObj) => (
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
              {userDetails.is_admin && (
                <div className="product-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(productObj.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/updateproduct/${productObj.id}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
    );
  }
  
  export default ProductsList;

