import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct, removeProduct } from "../../redux/slices/productSlice";

const CATEGORIES = ["Sofa", "Chair", "Table", "Bed", "Wardrobe", "Storage"];
const EMPTY_FORM = { name: "", category: CATEGORIES[0], price: "", image: "", description: "" };

function AdminProducts() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const startAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description || "",
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.price || !form.image) return;
    const payload = { ...form, price: Number(form.price) };
    if (editingId) dispatch(updateProduct({ id: editingId, changes: payload }));
    else dispatch(createProduct(payload));
    cancel();
  };

  return (
    <section className="admin-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CATALOG</p>
          <h1>Manage Products</h1>
        </div>
        <button className="primary-button" onClick={startAdd}>+ Add Product</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <label>
            Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Price (₹)
            <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </label>
          <label>
            Image filename
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="e.g. modern_sofa.jpg (place file in public/assets)" required />
          </label>
          <label>
            Description
            <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <div className="admin-form-actions">
            <button className="primary-button" type="submit">{editingId ? "Update Product" : "Add Product"}</button>
            <button type="button" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table">
        {items.map((item) => (
          <div className="admin-row" key={item.id}>
            <img src={`/assets/${item.image}`} alt={item.name} />
            <span>
              {item.name}
              <br />
              <small>{item.category}</small>
            </span>
            <span>₹{item.price.toLocaleString("en-IN")}</span>
            <div className="admin-row-actions">
              <button className="edit-button" onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => dispatch(removeProduct(item.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AdminProducts;
