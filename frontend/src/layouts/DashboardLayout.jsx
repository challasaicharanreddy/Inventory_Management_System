import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="main-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
