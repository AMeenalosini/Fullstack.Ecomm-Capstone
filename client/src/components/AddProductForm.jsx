import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { useAddproductMutation } from "../api/ecommApi";
import { useState, useEffect } from "react";

function AddProduct() {
  const navigate = useNavigate();
  const userDetails = useSelector(getUserDetails);

  const [addProduct, { isLoading, isSuccess, isError, error }] = useAddproductMutation();

  const [formData, setFormData] = useState({
    description: "",
    image_url: "",
    price: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isSuccess && submitted) {
      navigate("/");
    }
  }, [isSuccess, submitted, navigate]);

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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </button>
        {isError && <p style={{ color: "red" }}>Error: {error?.data?.message || "Failed to add product"}</p>}
      </form>
    </section>
  );
}

export default AddProduct;
