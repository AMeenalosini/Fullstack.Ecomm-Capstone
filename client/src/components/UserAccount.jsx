import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, initialState, resetUserDetails } from "../features/users/userDetailsSlice";
import { useSelector } from "react-redux";
import { getUserDetails } from "../features/users/userDetailsSlice";
import { ecommApi } from "../api/ecommApi";
import { useEffect } from "react";
import { useUserQuery, useFetchorderQuery } from "../api/ecommApi";

function UserAccount() {
  const userDetails = useSelector(getUserDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useUserQuery();

  const { data: orders, isLoading: ordersLoading, error: ordersError } = useFetchorderQuery(data?.id, {
    skip: !data?.id,
  });

  console.log("ordersError", ordersError)

  useEffect(() => {
    if (data) {
      dispatch(setUserDetails(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div><p>Loading...</p></div>;
  }

  if (error) {
    return <div><h2>Something went wrong! Please try again.</h2></div>;
  }

  const { id, username, password, is_admin, name, email_address, mailing_address, phone_number, billing_address } = data;



  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Clear token
    dispatch(resetUserDetails());     // Reset user state
    dispatch(ecommApi.util.resetApiState()); // Clear API cache
    navigate("/"); // Redirect
  };

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
             {orders?.map(order => (
               <li key={order.id}>
                   <strong>Order ID:</strong> {order.id} | 
                   <strong> Items:</strong> {order.total_item} | 
                   <strong> Amount:</strong> ${order.final_amount}
                </li>
              ))}
         </ul>
      </div>
    </section>
  );
}

export default UserAccount;
