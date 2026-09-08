import { useEffect, useState } from "react";
import { getUsers } from "../../services/users";

function formatTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = () => getUsers().then(setUsers).catch(() => {});

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="admin-page">
      <p className="eyebrow">CUSTOMERS</p>
      <h1>Manage Users</h1>
      <p className="muted">Live login activity for every account — refreshes automatically.</p>
      <div className="admin-table">
        {users.map((user) => (
          <div className="admin-row admin-row-user" key={user.id}>
            <span>
              {user.name}
              <br />
              <small>{user.email}</small>
            </span>
            <span className="role-tag">{user.role}</span>
            <span className={user.isOnline ? "status-badge online" : "status-badge offline"}>
              {user.isOnline ? "● Online" : "○ Offline"}
            </span>
            <span>
              <small>Login: {formatTime(user.lastLogin)}</small>
              <br />
              <small>Logout: {formatTime(user.lastLogout)}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AdminUsers;
