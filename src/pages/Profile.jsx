import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!user) return <section className="standard-page empty-state">Please <Link to="/login">login</Link> first.</section>;
  return <section className="standard-page"><p className="eyebrow">MY ACCOUNT</p><h1>Profile</h1><div className="profile-card"><h2>{user.name}</h2><p>{user.email}</p><p>Account type: {user.role}</p><button className="primary-button" onClick={() => { dispatch(logout()); navigate("/"); }}>Logout</button></div></section>;
}
export default Profile;