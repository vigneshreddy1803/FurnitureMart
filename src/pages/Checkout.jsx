import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placeOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";

function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submit = async (event) => {
    event.preventDefault();
    if (Object.values(address).some((value) => !value)) return;
    await dispatch(placeOrder({
      customerName: user?.name || address.name,
      customerEmail: user?.email || "guest",
      items: items.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      address,
      total,
      status: "Processing",
      createdAt: new Date().toISOString(),
    }));
    dispatch(clearCart());
    setPlaced(true);
  };

  if (placed) return <section className="standard-page success-box"><h1>Order placed successfully!</h1><p>Thank you for shopping with FurnitureMart.</p><Link className="primary-button" to="/orders">View Orders</Link></section>;
  if (!items.length) return <section className="standard-page empty-state">Add furniture to your cart before checkout.</section>;

  return <section className="checkout-page"><form className="checkout-form" onSubmit={submit}><p className="eyebrow">CHECKOUT</p><h1>Delivery details</h1>
    {Object.entries(address).map(([key, value]) => <label key={key}>{key[0].toUpperCase()+key.slice(1)}<input value={value} onChange={(e) => setAddress({...address, [key]: e.target.value})} /></label>)}
    <button className="primary-button">Place order</button></form><div className="summary"><h2>Your order</h2>{items.map((item)=><p key={item.id}>{item.name} × {item.quantity}</p>)}<p><strong>Total: ₹{total.toLocaleString("en-IN")}</strong></p></div></section>;
}
export default Checkout;
