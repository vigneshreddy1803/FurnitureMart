import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="standard-page">
      <p className="eyebrow">YOUR BAG</p><h1>Shopping Cart</h1>
      {!items.length ? <div className="empty-state">Your cart is empty. <Link to="/products">Start shopping</Link></div> :
        <div className="cart-layout">
          <div>{items.map((item) => <div className="cart-item" key={item.id}>
            <img src={`/assets/${item.image}`} alt={item.name} />
            <div><h3>{item.name}</h3><p>₹{item.price.toLocaleString("en-IN")}</p>
              <div className="quantity"><button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button><span>{item.quantity}</span><button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button></div>
              <button className="text-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          </div>)}</div>
          <aside className="summary"><h2>Order Summary</h2><p>Items <span>₹{total.toLocaleString("en-IN")}</span></p><p>Delivery <span>Free</span></p><hr/><h3>Total <span>₹{total.toLocaleString("en-IN")}</span></h3><Link className="primary-button" to="/checkout">Checkout</Link><button className="text-button" onClick={() => dispatch(clearCart())}>Clear cart</button></aside>
        </div>}
    </section>
  );
}
export default Cart;