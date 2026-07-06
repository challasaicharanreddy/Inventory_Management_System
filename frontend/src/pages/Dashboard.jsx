import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboardRes, inventoryRes] = await Promise.all([
          api.get("/dashboard"),
          api.get("/inventory"),
        ]);

        setStats(dashboardRes.data.data || {});
        setLogs(inventoryRes.data.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="main-body">Loading dashboard...</div>;
  }

  const recentProducts = stats?.recentProducts || [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Review key inventory metrics and recent activity.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <p className="card-title">Total Products</p>
          <div className="card-value">{stats.totalProducts ?? 0}</div>
        </div>
        <div className="card">
          <p className="card-title">Total Suppliers</p>
          <div className="card-value">{stats.totalSuppliers ?? 0}</div>
        </div>
        <div className="card">
          <p className="card-title">Low Stock</p>
          <div className="card-value">{stats.lowStockProducts ?? 0}</div>
        </div>
        <div className="card">
          <p className="card-title">Out of Stock</p>
          <div className="card-value">{stats.outOfStockProducts ?? 0}</div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Recent Products</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Recent Inventory Logs</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Change</th>
                <th>Previous</th>
                <th>New</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 6).map((log) => (
                <tr key={log._id}>
                  <td>{log.product?.name || "Unknown"}</td>
                  <td>{log.changeType}</td>
                  <td>{log.previousQuantity}</td>
                  <td>{log.newQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
