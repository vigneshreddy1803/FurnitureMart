import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (Object.values(address).some((value) => !value)) return;
    setPlaced(true);
  };

  if (placed) return <section className="standard-page success-box"><h1>Order placed successfully!</h1><p>Thank you for shopping with FurnitureMart.</p><Link className="primary-button" to="/orders">View Orders</Link></section>;
  if (!items.length) return <section className="standard-page empty-state">Add furniture to your cart before checkout.</section>;

  return <section className="checkout-page"><form className="checkout-form" onSubmit={submit}><p className="eyebrow">CHECKOUT</p><h1>Delivery details</h1>
    {Object.entries(address).map(([key, value]) => <label key={key}>{key[0].toUpperCase()+key.slice(1)}<input value={value} onChange={(e) => setAddress({...address, [key]: e.target.value})} /></label>)}
    <button className="primary-button">Place order</button></form><div className="summary"><h2>Your order</h2>{items.map((item)=><p key={item.id}>{item.name} × {item.quantity}</p>)}</div></section>;
}
export default Checkout;