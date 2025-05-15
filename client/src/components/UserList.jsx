import { useAdminusersQuery } from "../api/ecommApi";


function UserList() {
  const { data: users, isLoading, error } = useAdminusersQuery();

  console.log("adminuser:" , users )
  if (isLoading) return <h2>Loading users...</h2>;
  if (error) return <h2>Error fetching users.</h2>;

  return (
    <section style={{ padding: "1rem 2rem" }}>
      <h2>All Users</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone Number</th>
            <th style={thStyle}>Mailing Address</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>{user.id}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email_address}</td>
              <td style={tdStyle}>{user.phone_number}</td>
              <td style={tdStyle}>{user.mailing_address}</td>
              <td style={tdStyle}>{user.is_admin ? "Admin" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}


const thStyle = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "8px",
};

export default UserList;
