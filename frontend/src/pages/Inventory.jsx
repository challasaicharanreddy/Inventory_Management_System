import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const Inventory = () => {
  const [logs, setLogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === selectedProductId) || null,
    [products, selectedProductId]
  );

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(String(selectedProduct.quantity ?? ""));
    }
  }, [selectedProduct]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [logsRes, productsRes] = await Promise.all([
          api.get("/inventory"),
          api.get("/products", { params: { page: 1, limit: 100 } }),
        ]);

        setLogs(logsRes.data.logs || []);
        setProducts(productsRes.data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleStockUpdate = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedProductId) {
      setError("Please select a product to update.");
      return;
    }

    if (quantity === "" || Number.isNaN(Number(quantity))) {
      setError("Please enter a valid quantity.");
      return;
    }

    setActionLoading(true);

    try {
      await api.patch(`/products/${selectedProductId}/stock`, {
        quantity: Number(quantity),
        remarks,
      });

      setSuccess("Stock updated successfully.");
      setRemarks("");
      setError(null);

      const [logsRes, productsRes] = await Promise.all([
        api.get("/inventory"),
        api.get("/products", { params: { page: 1, limit: 100 } }),
      ]);

      setLogs(logsRes.data.logs || []);
      setProducts(productsRes.data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update stock.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Inventory Logs</h1>
          <p>Track stock changes, audit updates, and adjust inventory.</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <h2>Adjust Stock</h2>
        <form onSubmit={handleStockUpdate} className="form-panel">
          {error && <div className="alert">{error}</div>}
          {success && (
            <div className="alert" style={{ background: "#d1fae5", color: "#065f46", borderColor: "#a7f3d0" }}>
              {success}
            </div>
          )}

          <div className="input-group">
            <label>Product</label>
            <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)} required>
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>New Quantity</label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="3" />
          </div>

          <button className="button" type="submit" disabled={actionLoading}>
            {actionLoading ? "Updating stock..." : "Update Stock"}
          </button>
        </form>
      </div>

      <div className="panel">
        {loading ? (
          <div>Loading logs...</div>
        ) : logs.length === 0 ? (
          <div>No inventory logs available.</div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Change</th>
                  <th>Previous</th>
                  <th>New</th>
                  <th>Remarks</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>{log.product?.name || "Unknown"}</td>
                    <td>{log.changeType}</td>
                    <td>{log.previousQuantity}</td>
                    <td>{log.newQuantity}</td>
                    <td>{log.remarks || "-"}</td>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
