import { useEffect, useState } from "react";
import api from "../services/api";

const initialSupplier = { name: "", email: "", phone: "", address: "" };

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formValues, setFormValues] = useState(initialSupplier);
  const [error, setError] = useState(null);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/suppliers");
      setSuppliers(res.data.suppliers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const openCreate = () => {
    setFormMode("add");
    setSelectedSupplier(null);
    setFormValues(initialSupplier);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (supplier) => {
    setFormMode("edit");
    setSelectedSupplier(supplier);
    setFormValues({
      name: supplier.name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      if (formMode === "add") {
        await api.post("/suppliers", formValues);
      } else {
        await api.put(`/suppliers/${selectedSupplier._id}`, formValues);
      }
      setShowForm(false);
      loadSuppliers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save supplier.");
    }
  };

  const handleDelete = async (supplierId) => {
    if (!window.confirm("Delete this supplier?")) return;
    try {
      await api.delete(`/suppliers/${supplierId}`);
      loadSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Suppliers</h1>
          <p>Manage supplier contacts and addresses.</p>
        </div>
        <button className="button" onClick={openCreate}>Add Supplier</button>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        {loading ? (
          <div>Loading suppliers...</div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier._id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.address || "-"}</td>
                    <td>
                      <button className="button secondary" type="button" onClick={() => openEdit(supplier)}>
                        Edit
                      </button>
                      <button className="button danger" type="button" onClick={() => handleDelete(supplier._id)} style={{ marginLeft: 8 }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="panel">
          <h2>{formMode === "add" ? "Add Supplier" : "Edit Supplier"}</h2>
          {error && <div className="alert">{error}</div>}
          <form onSubmit={handleSubmit} className="form-panel">
            <div className="input-group">
              <label>Name</label>
              <input value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} type="email" required />
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input value={formValues.phone} onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Address</label>
              <textarea value={formValues.address} onChange={(e) => setFormValues({ ...formValues, address: e.target.value })} rows="3" />
            </div>
            <button className="button" type="submit">Save Supplier</button>
            <button className="button secondary" type="button" onClick={() => setShowForm(false)} style={{ marginLeft: 12 }}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
