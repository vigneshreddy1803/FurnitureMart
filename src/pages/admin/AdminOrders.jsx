function AdminOrders() {
  const orders = [
    { id: "#FM1001", customer: "Aarav", total: "₹38,500", status: "Processing" },
    { id: "#FM1002", customer: "Meera", total: "₹22,900", status: "Shipped" },
    { id: "#FM1003", customer: "Rahul", total: "₹61,200", status: "Delivered" }
  ];
  return <section className="admin-page"><p className="eyebrow">SALES</p><h1>Manage Orders</h1><div className="admin-table">{orders.map((order)=><div className="admin-row" key={order.id}><span>{order.id}</span><span>{order.customer}</span><span>{order.total}</span><span>{order.status}</span></div>)}</div></section>;
}
export default AdminOrders;