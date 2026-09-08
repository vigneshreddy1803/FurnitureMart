import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, changeOrderStatus } from "../../redux/slices/orderSlice";

const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.orders);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  return (
    <section className="admin-page">
      <p className="eyebrow">SALES</p>
      <h1>Manage Orders</h1>
      {items.length === 0 ? (
        <p className="muted">No orders have been placed yet.</p>
      ) : (
        <div className="admin-table">
          {items.slice().reverse().map((order) => (
            <div className="admin-row admin-row-order" key={order.id}>
              <span>#{order.id}</span>
              <span>
                {order.customerName}
                <br />
                <small>{order.customerEmail}</small>
              </span>
              <span>₹{Number(order.total).toLocaleString("en-IN")}</span>
              <select
                value={order.status}
                onChange={(event) => dispatch(changeOrderStatus({ id: order.id, status: event.target.value }))}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
export default AdminOrders;
