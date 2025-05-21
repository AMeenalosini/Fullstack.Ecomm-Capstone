/*****************************************************************************************************************/
/****     This code is to UPDATE an existing PRODUCT based on its ID                                          ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Create a functional component "UpdateProduct"                                                      ***/
/** Step 3: Fetch the existing product using ID from URL params                                                ***/
/** Step 4: Display form pre-filled with existing product data                                                 ***/
/** Step 5: Allow ADMIN to edit the details and submit the updated product                                     ***/
/** Step 6: Navigate to home page after successful update                                                      ***/
/**                                                                                                            ***/
/** NOTE: Please add new category in the array mentioned below                                                 ***/
/**          categories = ["scarf", "necklace", "ring", "earring"];                                            ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code  ***/
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { useProductbyidQuery, useUpdateproductMutation } from "../api/ecommApi";
import { useState, useEffect } from "react";

/** Step 2: Create a functional component "UpdateProduct"  ***/
function UpdateProduct() {
  const { id } = useParams();                                                   //Get product ID from URL
  const navigate = useNavigate();                                               //setup navigation
  const userDetails = useSelector(getUserDetails);                              //Get user details from Redux store

  /** Step 3: Fetch the existing product using ID from URL params  ***/ 
  const { data: product, isLoading, error } = useProductbyidQuery(id);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateproductMutation();  //Mutation hook to update product
  const categories = ["scarf", "necklace", "ring", "earring"];                    //List of allowed categories
  const [formData, setFormData] = useState({                                      //State to store form data
    description: "",
    image_url: "",
    price: "",
  });

  const [updateComplete, setUpdateComplete] = useState(false);                  //Track update completion for navigation

  /** Step 4: Display form pre-filled with existing product data ***/
  useEffect(() => {                                                             //Populate form once product is fetched
    if (product) {
      setFormData({
        description: product.description || "",
        image_url: product.image_url || "",
        price: product.price || "",
        category: product.category || "",
      });
    }
  }, [product]);

  /** Step 6: Navigate to home page after successful update ***/
  useEffect(() => {
    if (updateComplete) {
      navigate("/");
    }
  }, [updateComplete, navigate]);

  const handleChange = (e) => {                                               //Handle input field changes
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {                                       //Handle form submission
    e.preventDefault();
    if (!userDetails.is_admin) {
      alert("Only admin can update products");
      return;
    }
    try {
      await updateProduct({ id, ...formData }).unwrap();                    //Update API call
      setUpdateComplete(true);                                              // Set flag after successful update
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  if (isLoading) return <h2>Loading product...</h2>;
  if (error) return <h2>Error loading product</h2>;

  /** Step 5: Allow ADMIN to edit the details and submit the updated product  ***/
  return (
    <section>
      <h2>Update Product</h2>
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
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </section>
  );
}

export default UpdateProduct;
