import SideBar from "../Admin/Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div>
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};
export default Admin;
