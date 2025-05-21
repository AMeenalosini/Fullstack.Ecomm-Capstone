/*****************************************************************************************************************/
/****     This code is to render ORDER SUMMARY PAGE to place the order                                        ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Create an "OrderSummary" component to display order details and user shipping info                 ***/
/** Step 3: Handle "Place Order" functionality                                                                ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code  ***/
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { useLocation } from "react-router-dom";

/** Step 2: Create an "OrderSummary" component to display order details and user shipping info  ***/
function OrderSummary() {
  const userDetails = useSelector(getUserDetails);                      // Get user details from Redux
  const navigate = useNavigate();                                       // For redirection after placing order
  const { state } = useLocation();                                      // Get state passed from previous page
  const { total, totalItems, finaltotal, tax, orderId } = state || {}; // Destructure state values
  const taxrate = total * tax;                                         // Calculate tax amount

/** Step 3: Handle "Place Order" functionality  ***/
  const handlePlaceOrder = () => {
    alert("Order Placed!");                                           // Notify user
    navigate("/account");                                             // Navigate to Account page
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
