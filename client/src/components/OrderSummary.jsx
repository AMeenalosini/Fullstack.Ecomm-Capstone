import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, initialState, resetUserDetails } from "../features/users/userDetailsSlice";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { ecommApi } from "../api/ecommApi";
import { useEffect } from "react";
import { useUserQuery } from "../api/ecommApi";
import { useLocation } from "react-router-dom";

function OrderSummary() {
  const userDetails = useSelector(getUserDetails);
  const navigate = useNavigate();
  const { state } = useLocation(); // receives state from navigate
  const { total, totalItems, finaltotal, tax, orderId } = state || {};
  console.log("userDetails", userDetails)

  const taxrate = total * tax;

  const handlePlaceOrder = () => {
    alert("Order Placed!");
    navigate("/"); // Or navigate to home or order history
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong> Items:</strong> {totalItems}</p>
      <p><strong> Subtotal:</strong> ${total}</p>
      <p><strong>Tax ({(tax * 100).toFixed(0)}%):</strong> ${taxrate.toFixed(2)}</p>
      <p><strong> Total:</strong> ${finaltotal}</p>
      <hr />
      <h3>Shipping Address</h3>
      <p>{userDetails.mailing_address}</p>
      <button onClick={handlePlaceOrder} >
        Place Order
      </button>
    </div>
  );
}

export default OrderSummary;
