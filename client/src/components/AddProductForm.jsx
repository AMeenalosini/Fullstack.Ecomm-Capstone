/*****************************************************************************************************************/
/****     This code is to ADD new product to the "products" table. Only ADMIN can add the product.            ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Create a "Add Product" form in return function to receive the Input from the ADMIN                 ***/
/** Step 3: Create a COMPONENT "AddProduct" to add the below fucntionalities                                   ***/
/** Step 3a: Handle input change and update form data                                                          ***/
/** Step 3b: Handle form submission and add product using API                                                  ***/
/** Step 3c: Use Effect to navigate after successful submission                                                ***/
/**                                                                                                            ***/
/** NOTE: Please add new category in the array mentioned below                                                 ***/
/**          categories = ["scarf", "necklace", "ring", "earring"];                                            ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code **/    

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { useAddproductMutation } from "../api/ecommApi";
import { useState, useEffect } from "react";

/** Step 3: Create a COMPONENT "AddProduct" to add the below fucntionalities ***/

function AddProduct() {
  /** Step 3a: Declare the required variables **/
  const navigate = useNavigate();                                                         // To navigate to home page after product is added
  const userDetails = useSelector(getUserDetails);                                        // To get current user details from Redux store
  const [addProduct, { isLoading, isSuccess, isError, error }] = useAddproductMutation(); // Mutation hook to add product
  const categories = ["scarf", "necklace", "ring", "earring"];                            // Static category list
  const [formData, setFormData] = useState({                                              // State to manage form input data
    description: "",
    image_url: "",
    price: "",
    category: "",
  });
  const [submitted, setSubmitted] = useState(false);                                      // Track if form is submitted

  /** Step 3a: Handle input change and update form data **/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** Step 3b: Handle form submission and add product using API  **/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails.is_admin) {
      alert("Only admin can add products");
      return;
    }
    try {
      await addProduct(formData).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  /** Step 3c: Use Effect to navigate after successful submission  **/
  useEffect(() => {
    if (isSuccess && submitted) {
      navigate("/");
    }
  }, [isSuccess, submitted, navigate]);

  /** Step 2: Create a "Add Product" form in return function to receive the Input from the ADMIN  ***/
  return (
    <section>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </button>
        {isError && <p style={{ color: "red" }}>Error: {error?.data?.message || "Failed to add product"}</p>}
      </form>
    </section>
  );
}

export default AddProduct;
