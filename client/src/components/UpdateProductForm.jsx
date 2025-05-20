import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { useProductbyidQuery, useUpdateproductMutation } from "../api/ecommApi";
import { useState, useEffect } from "react";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userDetails = useSelector(getUserDetails);

  const { data: product, isLoading, error } = useProductbyidQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateproductMutation();

  const categories = ["scarf", "necklace", "ring", "earring"];

  const [formData, setFormData] = useState({
    description: "",
    image_url: "",
    price: "",
  });

  const [updateComplete, setUpdateComplete] = useState(false); // Local state

  useEffect(() => {
    if (product) {
      setFormData({
        description: product.description || "",
        image_url: product.image_url || "",
        price: product.price || "",
        category: product.category || "",
      });
    }
  }, [product]);

  // Navigate after local update flag is set
  useEffect(() => {
    if (updateComplete) {
      navigate("/");
    }
  }, [updateComplete, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails.is_admin) {
      alert("Only admin can update products");
      return;
    }

    try {
      await updateProduct({ id, ...formData }).unwrap();
      setUpdateComplete(true); // ✅ Set flag after successful update
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  if (isLoading) return <h2>Loading product...</h2>;
  if (error) return <h2>Error loading product</h2>;

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
