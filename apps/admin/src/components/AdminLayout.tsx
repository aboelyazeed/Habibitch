import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">🛡️ لوحة الإدارة</div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          📊 لوحة التحكم
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          ⚠️ البلاغات
        </NavLink>
        <NavLink
          to="/verified-creators"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          ✅ المنشئين الموثقين
        </NavLink>
        <div style={{ flex: 1 }} />
        <div className="nav-item" onClick={() => navigate("/login")}>
          🚪 خروج
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
