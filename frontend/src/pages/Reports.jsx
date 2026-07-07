import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [lowStock, setLowStock] = useState([]);
  const [productSummary, setProductSummary] = useState(null);
  const [supplierSummary, setSupplierSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockByCategory, setStockByCategory] = useState([]);
  const [productsBySupplier, setProductsBySupplier] = useState([]);
  const [topStockProducts, setTopStockProducts] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [
          lowStockRes,
          productRes,
          supplierRes,
          stockCatRes,
          prodBySuppRes,
          topStockRes,
        ] = await Promise.all([
          api.get("/reports/low-stock"),
          api.get("/reports/product-summary"),
          api.get("/reports/supplier-summary"),
          api.get("/reports/stock-by-category"),
          api.get("/reports/products-by-supplier"),
          api.get("/reports/top-stock-products"),
        ]);

        setLowStock(lowStockRes.data.report || []);
        setProductSummary(productRes.data.summary || null);
        setSupplierSummary(supplierRes.data.summary || []);
        setStockByCategory(stockCatRes.data.data || []);
        setProductsBySupplier(prodBySuppRes.data.data || []);
        setTopStockProducts(topStockRes.data.data || []);
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
        <div className="card color-1">
          <p className="card-title">Total Products</p>
          <div className="card-value">{productSummary?.totalProducts ?? 0}</div>
        </div>
        <div className="card color-2">
          <p className="card-title">Total Stock</p>
          <div className="card-value">{productSummary?.totalStock ?? 0}</div>
        </div>
        <div className="card color-3">
          <p className="card-title">Average Price</p>
          <div className="card-value">${productSummary?.averagePrice?.toFixed(2) ?? "0.00"}</div>
        </div>
        <div className="card color-4">
          <p className="card-title">Total Inventory Value</p>
          <div className="card-value">${productSummary?.totalInventoryValue?.toFixed(2) ?? "0.00"}</div>
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

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Stock by Category</h2>
        <div style={{ maxWidth: 800 }}>
          <Bar
            data={{
              labels: stockByCategory.map((s) => s.category || "Uncategorized"),
              datasets: [
                {
                  label: "Total Stock",
                  data: stockByCategory.map((s) => s.totalStock),
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Products by Supplier</h2>
        <div style={{ maxWidth: 600 }}>
          <Pie
            data={{
              labels: productsBySupplier.map((s) => s.supplierName || "Unknown"),
              datasets: [
                {
                  data: productsBySupplier.map((s) => s.productCount),
                  backgroundColor: [
                    "#4dc9f6",
                    "#f67019",
                    "#f53794",
                    "#537bc4",
                    "#acc236",
                    "#166a8f",
                  ],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Top 5 Highest Stock Products</h2>
        <div style={{ maxWidth: 800 }}>
          <Bar
            data={{
              labels: topStockProducts.map((p) => p.name),
              datasets: [
                {
                  label: "Quantity",
                  data: topStockProducts.map((p) => p.quantity),
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
