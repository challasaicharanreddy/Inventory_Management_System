import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const initialProduct = {
  name: "",
  sku: "",
  category: "",
  quantity: "",
  price: "",
  supplier: "",
  description: "",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValues, setFormValues] = useState(initialProduct);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products", {
        params: {
          search,
          page,
          limit: 10,
        },
      });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSuppliers = async () => {
    try {
      const res = await api.get("/suppliers");
      setSuppliers(res.data.suppliers || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadSuppliers();
  }, [page, search]);

  const openCreate = () => {
    setFormMode("add");
    setSelectedProduct(null);
    setFormValues(initialProduct);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setFormValues({
      name: product.name || "",
      sku: product.sku || "",
      category: product.category || "",
      quantity: product.quantity ?? "",
      price: product.price ?? "",
      supplier: product.supplier?._id || "",
      description: product.description || "",
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const payload = {
      ...formValues,
      quantity: Number(formValues.quantity),
      price: Number(formValues.price),
    };

    try {
      if (formMode === "add") {
        await api.post("/products", payload);
      } else {
        await api.put(`/products/${selectedProduct._id}`, payload);
      }
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save product.");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }
    try {
      await api.delete(`/products/${productId}`);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setPage(index + 1)}
        className={`button secondary${page === index + 1 ? "" : ""}`}
        style={{ opacity: page === index + 1 ? 1 : 0.8 }}
      >
        {index + 1}
      </button>
    ));
  }, [page, totalPages]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage products and update inventory details.</p>
        </div>
        <button className="button" onClick={openCreate}>Add Product</button>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 18 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{ flex: 1, minWidth: 240 }}
          />
          <div>{loading ? "Loading products..." : `Page ${page} of ${totalPages}`}</div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category || "-"}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price?.toFixed(2)}</td>
                  <td>{product.supplier?.name || "-"}</td>
                  <td>
                    <button className="button secondary" type="button" onClick={() => openEdit(product)}>
                      Edit
                    </button>
                    <button className="button danger" type="button" onClick={() => handleDelete(product._id)} style={{ marginLeft: 8 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>{paginationButtons}</div>
      </div>

      {showForm && (
        <div className="panel" style={{ marginTop: 24 }}>
          <h2>{formMode === "add" ? "Add New Product" : "Edit Product"}</h2>
          {error && <div className="alert">{error}</div>}
          <form onSubmit={handleSubmit} className="form-panel">
            <div className="input-group">
              <label>Name</label>
              <input value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>SKU</label>
              <input value={formValues.sku} onChange={(e) => setFormValues({ ...formValues, sku: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Category</label>
              <input value={formValues.category} onChange={(e) => setFormValues({ ...formValues, category: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Supplier</label>
              <select value={formValues.supplier} onChange={(e) => setFormValues({ ...formValues, supplier: e.target.value })}>
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Quantity</label>
              <input value={formValues.quantity} onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })} type="number" min="0" required />
            </div>
            <div className="input-group">
              <label>Price</label>
              <input value={formValues.price} onChange={(e) => setFormValues({ ...formValues, price: e.target.value })} type="number" min="0" step="0.01" required />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea value={formValues.description} onChange={(e) => setFormValues({ ...formValues, description: e.target.value })} rows="4" />
            </div>
            <button className="button" type="submit">Save Product</button>
            <button className="button secondary" type="button" onClick={() => setShowForm(false)} style={{ marginLeft: 12 }}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
