import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaTruck, FaClipboardList, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Products", path: "/products", icon: <FaBoxOpen /> },
    { label: "Suppliers", path: "/suppliers", icon: <FaTruck /> },
    { label: "Inventory", path: "/inventory", icon: <FaClipboardList /> },
    { label: "Reports", path: "/reports", icon: <FaChartBar /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Inventory</h2>
        <p>Management</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
