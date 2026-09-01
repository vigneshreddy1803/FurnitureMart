import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return setError("Please enter email and password.");
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) navigate("/");
    else setError(result.payload || "Invalid login details.");
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login</h1>
        <p className="muted">Access your FurnitureMart account.</p>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></label>
        {(error || authError) && <p className="form-error">{error || authError}</p>}
        <button className="primary-button" type="submit">Login</button>
        <p>New customer? <Link to="/registration">Create an account</Link></p>
      </form>
    </section>
  );
}
export default Login;