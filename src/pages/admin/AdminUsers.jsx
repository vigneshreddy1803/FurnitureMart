import { useEffect, useState } from "react";
import { getUsers } from "../../services/users";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { getUsers().then(setUsers).catch(() => setUsers([])); }, []);
  return <section className="admin-page"><p className="eyebrow">CUSTOMERS</p><h1>Manage Users</h1><div className="admin-table">{users.map((user)=><div className="admin-row" key={user.id}><span>{user.name}</span><span>{user.email}</span><span>{user.role}</span></div>)}</div></section>;
}
export default AdminUsers;