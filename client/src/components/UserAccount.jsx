/*****************************************************************************************************************/
/****     This code is to render USER ACCOUNT PAGE with user details, logout, and order history               ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Fetch user details and order data using RTK Query                                                  ***/
/** Step 3: Handle loading and error states                                                                    ***/
/** Step 4: Display user information and orders with created_at date                                           ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code  ***/
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, initialState, resetUserDetails } from "../features/users/userDetailsSlice";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { ecommApi } from "../api/ecommApi";
import { useEffect } from "react";
import { useUserQuery, useFetchorderQuery } from "../api/ecommApi";

/** Step 2: Create the UserAccount component **/
function UserAccount() {
  const userDetails = useSelector(getUserDetails);          // Get user details from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useUserQuery();        // Fetch current user data

  const { data: orders, isLoading: ordersLoading, error: ordersError } = useFetchorderQuery(data?.id, {
    skip: !data?.id,
  });                                                         // Only fetch orders if user ID is available

    useEffect(() => {
    if (data) {
      dispatch(setUserDetails(data));                         // Update user details in Redux
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div><p>Loading...</p></div>;
  }

  if (error) {
    return <div><h2>Something went wrong! Please try again.</h2></div>;
  }

  const { id, username, password, is_admin, name, email_address, mailing_address, phone_number, billing_address } = data;


/** Step 3: Logout functionality **/
  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");                         // Clear Auth token
    dispatch(resetUserDetails());                             // Reset user state
    dispatch(ecommApi.util.resetApiState());                  // Clear API cache
    navigate("/");                                            // Redirect to HOME page
  };

  /** Step 4: Render user details and orders **/
  return (
    <section className="detail">
      <div className="detail_intro">
        <div>
          <h2 className="capitalized">Welcome {name}!</h2>
        </div>
        <div className="description">
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="detail_body">
        <h3>Email: {email_address}</h3>
      </div>
      <div className="detail">
        <h3>Mailing Address:</h3> <p>{mailing_address}</p>
        <h3>Billing Address:</h3> <p>{billing_address}</p>
        <h3>Phone number:</h3> <p>{phone_number}</p>
        <h3>Your Orders:</h3>
            {ordersLoading && <p>Loading orders...</p>}
            {ordersError && <p>Error fetching orders.</p>}
            {!ordersLoading && orders?.length === 0 && <p>No orders found.</p>}
        <ul>
          {orders?.map(order => {
            const createdAt = new Date(order.created_at); // Convert timestamp string to Date object
            const formattedDate = createdAt.toLocaleDateString();
            const formattedTime = createdAt.toLocaleTimeString();

            return (
              <li key={order.id}>
                <strong>Order ID:</strong> {order.id} |{" "}
                <strong>Items:</strong> {order.total_item} |{" "}
                <strong>Amount:</strong> ${order.final_amount} |{" "}
                <strong>Date:</strong> {formattedDate} |{" "}
                <strong>Time:</strong> {formattedTime}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default UserAccount;
