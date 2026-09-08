import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../redux/slices/orderSlice";

function Orders() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items).filter((order) => user && order.customerEmail === user.email);

  useEffect(() => { if (user) dispatch(fetchOrders()); }, [dispatch, user]);

  if (!user) return <section className="standard-page"><p className="eyebrow">ACCOUNT</p><h1>Your Orders</h1><div className="empty-state">Please <Link to="/login">login</Link> to view orders.</div></section>;

  return (
    <section className="standard-page">
      <p className="eyebrow">ACCOUNT</p>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p className="muted">No orders yet. <Link to="/products">Start shopping</Link>.</p>
      ) : (
        orders.slice().reverse().map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</p>
            <p>Total: ₹{Number(order.total).toLocaleString("en-IN")}</p>
            <span className="status-badge">{order.status}</span>
          </div>
        ))
      )}
    </section>
  );
}
export default Orders;
