import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Asidebar from "../components/Asidebar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { fetchProducts } from "../redux/slices/productSlice";

function Products() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { items, status } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const filtered = useMemo(() => items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory && item.price <= maxPrice;
  }), [items, search, category, maxPrice]);

  return (
    <section className="products-page">
      <div className="page-heading"><div><p className="eyebrow">OUR COLLECTION</p><h1>Furniture</h1></div><SearchBar value={search} onChange={setSearch} /></div>
      <div className="catalog-layout">
        <Asidebar category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
        <div className="product-area">
          {status === "loading" ? <Loader /> : <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
          {!filtered.length && status !== "loading" && <div className="empty-state">No furniture matches your filters.</div>}
        </div>
      </div>
    </section>
  );
}
export default Products;