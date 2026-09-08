import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { getUsers } from "../../services/users";

function AdminDashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const orders = useSelector((state) => state.orders.items);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!products.length) dispatch(fetchProducts());
    dispatch(fetchOrders());
    getUsers().then(setUsers).catch(() => setUsers([]));
  }, [dispatch]);

  const onlineCount = users.filter((user) => user.isOnline).length;

  return <section className="admin-page">
    <p className="eyebrow">FURNITUREMART ADMIN</p>
    <h1>Dashboard</h1>
    <div className="admin-stats">
      <div>
        <span>Products</span>
        <strong>{products.length}</strong>
      </div>
      <div>
        <span>Users ({onlineCount} online)</span>
        <strong>{users.length}</strong>
      </div>
      <div>
        <span>Orders</span>
        <strong>{orders.length}</strong>
      </div>
    </div>
    <div className="admin-links">
      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/users">Manage Users</Link>
      <Link to="/admin/orders">Manage Orders</Link>
    </div>
  </section>;
}
export default AdminDashboard;
