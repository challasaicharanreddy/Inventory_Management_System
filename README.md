# 📦 Inventory Management System

A cloud-deployed **MERN Stack Inventory Management System** built to streamline inventory operations through secure authentication, supplier and product management, inventory tracking, analytics dashboards, and reporting. The application provides a modern and responsive interface for efficiently managing business inventory.

## 🚀 Live Demo

- **Frontend:** https://your-vercel-url.vercel.app
- **Backend API:** https://inventory-management-system-emet.onrender.com
- **GitHub:** https://github.com/challasaicharanreddy/Inventory_Management_System

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based Authentication
- Secure password hashing using bcrypt
- Protected routes
- Role-aware access control (Admin, Manager, Employee)
- Request validation using Express Validator

### 📦 Product Management
- Add, edit, delete, and view products
- Category-based product organization
- Search and filter products
- SKU-based inventory management

### 🏢 Supplier Management
- Add, edit, delete, and manage suppliers
- Link suppliers with products
- Supplier-wise product tracking

### 📊 Inventory Tracking
- Stock quantity updates
- Inventory audit logs
- Track previous and current stock
- Updated By (User Role)
- Timestamped inventory history
- Remarks for every inventory update

### 📈 Dashboard & Analytics
- Total Products
- Total Suppliers
- Low Stock Products
- Out of Stock Products
- Inventory Summary Cards
- Interactive Chart.js Visualizations
  - Stock by Category
  - Products by Supplier
  - Top 5 Stocked Products

### 📑 Reports
- Product Summary Report
- Supplier Summary Report
- Low Stock Report
- Inventory Statistics

### ☁️ Deployment
- Backend deployed on Render
- Frontend deployed on Vercel
- Database hosted on MongoDB Atlas

---

# 🏗️ System Architecture

```
                React (Vite)
                      │
                 Axios API Calls
                      │
             Express REST APIs
                      │
       Controllers → Services → Models
                      │
                 MongoDB Atlas
```

---

# 🛠️ Tech Stack

## Frontend
- React.js (Vite)
- React Router
- Axios
- Tailwind CSS
- Chart.js

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Express Validator
- Helmet
- CORS
- Morgan

## Database
- MongoDB Atlas
- Mongoose

## Deployment
- Render
- Vercel

## Version Control
- Git
- GitHub

---

# 📂 Project Structure

```
Inventory_Management_System
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# 📸 Application Modules

- 🔐 Authentication
- 📦 Products
- 🏢 Suppliers
- 📊 Dashboard
- 📈 Analytics
- 📑 Reports
- 📋 Inventory Logs

---

# ⚡ Installation

## Clone Repository

```bash
git clone https://github.com/challasaicharanreddy/Inventory_Management_System.git
```

## Backend

```bash
cd Backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
```

---

# 🎯 Future Enhancements

- Barcode / QR Code Integration
- Email Notifications for Low Stock
- Purchase Order Management
- PDF & Excel Report Export
- AI-based Inventory Forecasting
- Sales Management Module
- Real-time Notifications
- Image Upload for Products

---

# 👨‍💻 Author

**Challa Sai Charan Reddy**

- GitHub: https://github.com/challasaicharanreddy
- LinkedIn: https://www.linkedin.com/in/challa-sai-charan-reddy-6112b32b8/

---

## ⭐ If you found this project useful, consider giving it a Star!