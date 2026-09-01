function Asidebar({ category, setCategory, maxPrice, setMaxPrice }) {
  const categories = ["All", "Sofa", "Chair", "Table", "Bed", "Wardrobe", "Storage"];
  return (
    <aside className="asidebar">
      <h3>Filter Furniture</h3>
      <label>Category</label>
      {categories.map((item) => (
        <button
          key={item}
          className={category === item ? "filter-active" : ""}
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
      <label>Maximum Price</label>
      <input
        type="range"
        min="5000"
        max="100000"
        step="5000"
        value={maxPrice}
        onChange={(event) => setMaxPrice(Number(event.target.value))}
      />
      <p>Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
    </aside>
  );
}
export default Asidebar;