import { Link } from "react-router-dom";

function CategoryCard({ title, image, text }) {
  return (
    <Link className="category-card" to={`/products?category=${title}`}>
      <img src={`/assets/${image}`} alt={title} />
      <div><h3>{title}</h3><p>{text}</p></div>
    </Link>
  );
}
export default CategoryCard;