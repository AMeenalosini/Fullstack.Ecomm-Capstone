import { useAdminusersQuery } from "../api/ecommApi";


function UserList() {
  const { data: users, isLoading, error } = useAdminusersQuery();

  console.log("adminuser:" , users )
  if (isLoading) return <h2>Loading users...</h2>;
  if (error) return <h2>Error fetching users.</h2>;

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
