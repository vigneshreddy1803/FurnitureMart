import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

function Registration() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword)
   return setError("All fields are required.");
    if (form.password.length < 6) return setError("Password must contain at least 6 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) navigate("/");
    else setError(result.payload || "Registration failed.");
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">JOIN FURNITUREMART</p><h1>Create account</h1>
        <label>Full Name<input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></label>
        <label>Confirm Password<input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
export default Registration;