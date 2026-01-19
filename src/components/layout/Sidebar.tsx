import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside style={{ width: 200, padding: 16, background: "#f4f4f4" }}>
      <h3>SecureFlow</h3>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
