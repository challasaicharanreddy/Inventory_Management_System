import { useEffect, useState } from "react";
import api from "../services/api";

const Reports = () => {
  const [lowStock, setLowStock] = useState([]);
  const [productSummary, setProductSummary] = useState(null);
  const [supplierSummary, setSupplierSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [lowStockRes, productRes, supplierRes] = await Promise.all([
          api.get("/reports/low-stock"),
          api.get("/reports/product-summary"),
          api.get("/reports/supplier-summary"),
        ]);

        setLowStock(lowStockRes.data.report || []);
        setProductSummary(productRes.data.summary || null);
        setSupplierSummary(supplierRes.data.summary || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Review stock alerts, product summary, and supplier details.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <p className="card-title">Total Products</p>
          <div className="card-value">{productSummary?.totalProducts ?? 0}</div>
        </div>
        <div className="card">
          <p className="card-title">Total Stock</p>
          <div className="card-value">{productSummary?.totalStock ?? 0}</div>
        </div>
        <div className="card">
          <p className="card-title">Average Price</p>
          <div className="card-value">${productSummary?.averagePrice?.toFixed(2) ?? "0.00"}</div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Low Stock Products</h2>
        {loading ? (
          <div>Loading reports...</div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Supplier</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.supplier?.name || "-"}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Supplier Summary</h2>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Email</th>
                <th>Total Products</th>
                <th>Total Stock</th>
              </tr>
            </thead>
            <tbody>
              {supplierSummary.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.supplierEmail}</td>
                  <td>{supplier.totalProducts}</td>
                  <td>{supplier.totalStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
