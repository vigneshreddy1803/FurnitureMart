import { Link } from "react-router-dom";
function NotFound() {
  return <section className="standard-page not-found"><h1>404</h1><p>We could not find that furniture page.</p><Link className="primary-button" to="/">Go Home</Link></section>;
}
export default NotFound;