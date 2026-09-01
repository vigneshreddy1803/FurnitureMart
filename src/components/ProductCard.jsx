import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={`/src/assets/${product.image}`} alt={product.name} />
      </Link>
      <div className="product-info">
        <span>{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">₹{product.price.toLocaleString("en-IN")}</p>
        <div className="card-actions">
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          <button className="wish-button" onClick={() => dispatch(toggleWishlist(product))}>♡</button>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;