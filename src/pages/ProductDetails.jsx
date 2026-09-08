import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, status } = useSelector((state) => state.products);

  useEffect(() => { dispatch(fetchProductById(id)); }, [dispatch, id]);

  if (status === "loading" || !selected) return <div className="detail-page"><p>Loading product...</p></div>;

  return (
    <section className="detail-page">
      <Link to="/products">← Back to furniture</Link>
      <div className="detail-card">
        <img src={`/assets/${selected.image}`} alt={selected.name} />
        <div>
          <p className="eyebrow">{selected.category}</p><h1>{selected.name}</h1>
          <p className="detail-price">₹{selected.price.toLocaleString("en-IN")}</p>
          <p>{selected.description}</p>
          <ul><li>Solid, furniture-grade construction</li><li>Designed for everyday comfort</li><li>Carefully packed for delivery</li></ul>
          <button className="primary-button" onClick={() => dispatch(addToCart(selected))}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
export default ProductDetails;