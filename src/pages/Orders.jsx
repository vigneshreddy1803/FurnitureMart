import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Orders() {
  const user = useSelector((state) => state.auth.user);
  return <section className="standard-page"><p className="eyebrow">ACCOUNT</p><h1>Your Orders</h1>{user ? <div className="order-card"><h3>Recent order</h3><p>Furniture order history will appear here after checkout.</p><span className="status-badge">Processing</span></div> : <div className="empty-state">Please <Link to="/login">login</Link> to view orders.</div>}</section>;
}
export default Orders;