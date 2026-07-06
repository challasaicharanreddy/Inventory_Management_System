import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div>
          <h1 className="navbar-title">Inventory Dashboard</h1>
          <p className="navbar-subtitle">Welcome back, {user?.name || "Admin"}.</p>
        </div>

        <div className="navbar-user">
          <div className="avatar">{user?.name?.charAt(0)?.toUpperCase() || "A"}</div>
          <div>
            <div style={{ fontWeight: 700 }}>{user?.name || "Admin"}</div>
            <div style={{ color: "#64748b", fontSize: "13px" }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
