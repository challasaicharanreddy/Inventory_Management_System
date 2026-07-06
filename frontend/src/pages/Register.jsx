import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="main-body" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div className="panel centered-panel" style={{ maxWidth: 520 }}>
        <h1 style={{ marginTop: 0 }}>Create account</h1>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Register and start managing your inventory today.</p>

        {(error || submitError) && (
          <div className="alert">{submitError || error}</div>
        )}

        <div className="form-panel">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" required minLength={3} />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} />
            </div>

            <button className="button" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p style={{ marginTop: 20, color: "#64748b" }}>
            Already have an account? <Link to="/" style={{ color: "#2563eb", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
