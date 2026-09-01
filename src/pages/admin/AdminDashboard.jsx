import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const products = useSelector((state) => state.products.items);
  return <section className="admin-page"><p className="eyebrow">FURNITUREMART ADMIN</p><h1>Dashboard</h1><div className="admin-stats"><div><span>Products</span><strong>{products.length}</strong></div><div><span>Users</span><strong>3</strong></div><div><span>Orders</span><strong>12</strong></div></div><div className="admin-links"><Link to="/admin/products">Manage Products</Link><Link to="/admin/users">Manage Users</Link><Link to="/admin/orders">Manage Orders</Link></div></section>;
}
export default AdminDashboard;