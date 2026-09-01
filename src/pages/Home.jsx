import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">FURNITURE FOR BETTER LIVING</p>
          <h1>Make your home feel beautifully yours.</h1>
          <p>Explore thoughtfully designed sofas, beds, tables, chairs and storage furniture at FurnitureMart.</p>
          <Link className="primary-button" to="/products">Shop Furniture</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">SHOP BY ROOM</p><h2>Find your perfect piece</h2></div>
          <Link to="/products">View all</Link>
        </div>
        <div className="category-grid">
          <CategoryCard title="Sofa" image="sofa_modern.jpg" text="Relax in comfort" />
          <CategoryCard title="Bed" image="king_bed.jpg" text="Sleep in style" />
          <CategoryCard title="Table" image="dining_table.jpg" text="Gather together" />
          <CategoryCard title="Chair" image="accent_chair.jpg" text="Sit beautifully" />
        </div>
      </section>

      <section className="promo">
        <div><p className="eyebrow">MADE FOR EVERY HOME</p><h2>Simple shapes. Warm materials. Lasting comfort.</h2></div>
        <Link className="secondary-button" to="/products">Explore collection</Link>
      </section>
    </div>
  );
}
export default Home;