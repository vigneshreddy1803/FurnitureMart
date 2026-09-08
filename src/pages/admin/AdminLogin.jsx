import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../redux/slices/authSlice";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return setError("Please enter email and password.");
    const result = await dispatch(loginAdmin(form));
    if (loginAdmin.fulfilled.match(result)) navigate("/admin");
    else setError(result.payload || "Invalid admin credentials.");
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">ADMIN ACCESS</p>
        <h1>Admin Login</h1>
        <p className="muted">Restricted area. Only the authorized FurnitureMart admin account can sign in here.</p>
        <label>Admin Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        {(error || authError) && <p className="form-error">{error || authError}</p>}
        <button className="primary-button" type="submit">Login as Admin</button>
      </form>
    </section>
  );
}
export default AdminLogin;
