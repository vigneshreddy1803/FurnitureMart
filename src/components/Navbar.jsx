import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const user = useSelector((state) => state.auth.user);

  return (


    <header className="navbar">
      <Link className="brand" to="/">Furniture<span>Mart</span></Link>
      <nav className="links">
        <Link style={{paddingTop:'5px'}} to="/">Home</Link>
        <Link style={{paddingTop:'5px'}} to="/products">Products</Link>
        <Link   to="/wishlist"> <img src="https://img.icons8.com/?size=100&id=mklm5HhF1hQB&format=png&color=000000" alt="" style={{ width: '30px', height: '30px' }}/>  ({wishlistCount})</Link>
        <Link  to="/cart"> <img src="https://img.icons8.com/?size=100&id=BBhHIwJINbBl&format=png&color=000000" alt=""  style={{ width: '30px', height: '30px' }}/> ({cartCount})</Link>
          {user && user.role === "admin" && <Link style={{paddingTop:'5px'}} to="/admin">Admin Panel</Link>}
          <button style={{backgroundColor: '#6f4930', color: '#fff', border: 'none', padding: '6px', borderRadius: '7px', cursor: 'pointer'}}>

         {user ? <Link to="/profile">Hi, {user.name}</Link> : <Link to="/login">Login</Link>} </button>
      </nav>
    </header>
  );
}
export default Navbar;