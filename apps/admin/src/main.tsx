import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import ReportsQueuePage from "./pages/ReportsQueue";
import ReportDetailPage from "./pages/ReportDetail";
import UserDetailPage from "./pages/UserDetail";
import StreamDetailPage from "./pages/StreamDetail";
import VerifiedCreatorsPage from "./pages/VerifiedCreators";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsQueuePage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/streams/:id" element={<StreamDetailPage />} />
          <Route path="/verified-creators" element={<VerifiedCreatorsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
