import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;
  return children;
}
export default AdminRoute;
