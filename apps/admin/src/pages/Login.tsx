import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="card login-card" style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>🛡️ لوحة الإدارة</h1>
          <p style={{ color: "var(--text-muted)" }}>
            حبيبي ستريم — وصول المشرفين فقط
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@habibi.stream"
            />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px" }}
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}
