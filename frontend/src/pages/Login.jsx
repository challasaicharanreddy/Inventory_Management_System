import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="main-body" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div className="panel centered-panel" style={{ maxWidth: 480 }}>
        <h1 style={{ marginTop: 0 }}>Sign in</h1>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Access your inventory dashboard and manage your stock.</p>

        {(error || submitError) && (
          <div className="alert">{submitError || error}</div>
        )}

        <div className="form-panel">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} />
            </div>

            <button className="button" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p style={{ marginTop: 20, color: "#64748b" }}>
            New here? <Link to="/register" style={{ color: "#2563eb", fontWeight: 600 }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
