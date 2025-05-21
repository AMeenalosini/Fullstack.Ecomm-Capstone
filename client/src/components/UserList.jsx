/***************************************************************************************************************/
/****     This component renders the ADMIN USER LIST TABLE for all registered users                         ****/
/***************************************************************************************************************/
/** Step 1: Import the required RTK Query hook to fetch user data from backend                               ***/
/** Step 2: Fetch all users using useAdminusersQuery (accessible only by admin users)                        ***/
/** Step 3: Handle loading and error states gracefully                                                        ***/
/** Step 4: Display users in a styled table with fields: ID, Name, Email, Phone, Mailing Address, and Role   **/
/***************************************************************************************************************/

/** Step 1: Import the required RTK Query hook **/
import { useAdminusersQuery } from "../api/ecommApi";

/** Step 2: Create the UserList component **/
function UserList() {
  // Use RTK Query to fetch all registered users (admin access required)
  const { data: users, isLoading, error } = useAdminusersQuery();
  /** Step 3: Handle loading and error states **/
  if (isLoading) return <h2>Loading users...</h2>;
  if (error) return <h2>Error fetching users.</h2>;

  /** Step 4: Render the users table **/
  return (
  <section className="user-section">
    <h2>All Users</h2>
    <table className="user-table">
      <thead>
        <tr className="table-header-row">
          <th className="table-th">ID</th>
          <th className="table-th">Name</th>
          <th className="table-th">Email</th>
          <th className="table-th">Phone Number</th>
          <th className="table-th">Mailing Address</th>
          <th className="table-th">Role</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id} className="table-row">
            <td className="table-td">{user.id}</td>
            <td className="table-td">{user.name}</td>
            <td className="table-td">{user.email_address}</td>
            <td className="table-td">{user.phone_number}</td>
            <td className="table-td">{user.mailing_address}</td>
            <td className="table-td">{user.is_admin ? "Admin" : "User"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
}


export default UserList;
