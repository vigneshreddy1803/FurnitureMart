import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  return (
    <section className="standard-page">
      <p className="eyebrow">SAVED FURNITURE</p><h1>Your Wishlist</h1>
      {!items.length ? <div className="empty-state">Your wishlist is empty. <Link to="/products">Browse furniture</Link></div> :
        <div className="product-grid">{items.map((item) => <article className="product-card" key={item.id}>
          <img src={`/assets/${item.image}`} alt={item.name} /><div className="product-info"><h3>{item.name}</h3><p className="price">₹{item.price.toLocaleString("en-IN")}</p>
          <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button><button className="text-button" onClick={() => dispatch(removeFromWishlist(item.id))}>Remove</button></div>
        </article>)}</div>}
    </section>
  );
}
export default Wishlist;