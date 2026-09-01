import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/slices/productSlice";

function AdminProducts() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return <section className="admin-page"><p className="eyebrow">CATALOG</p><h1>Manage Products</h1><div className="admin-table">{items.map((item)=><div className="admin-row" key={item.id}><img src={`/src/assets/${item.image}`} alt={item.name}/><span>{item.name}</span><span>₹{item.price.toLocaleString("en-IN")}</span><button onClick={()=>dispatch(deleteProduct(item.id))}>Delete</button></div>)}</div></section>;
}
export default AdminProducts;