import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored === "dark" || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(dark);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

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
            <div style={{ color: "var(--muted)", fontSize: "13px" }}>{user?.role || "Administrator"}</div>
          </div>
          <button onClick={toggleTheme} className="button secondary" style={{ marginLeft: 12 }}>
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
