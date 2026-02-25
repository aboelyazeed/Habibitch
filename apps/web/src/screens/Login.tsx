import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Radio } from "lucide-react";
import { t } from "../i18n";
import { useAuthStore } from "../state/store";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      // Error is handled by the store and can be displayed if we want
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Background decoration */}
        <div className="auth-glow auth-glow-1" />
        <div className="auth-glow auth-glow-2" />

        <div className="auth-card card-glass">
          {/* Logo */}
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Radio size={28} />
            </div>
            <h1 className="auth-logo-text">حبيبي ستريم</h1>
          </div>

          <h2 className="auth-title">{t("auth.loginTitle")}</h2>
          <p className="auth-subtitle">{t("auth.welcomeSubtitle")}</p>

          {error && (
            <div
              style={{
                color: "var(--color-live)",
                backgroundColor: "var(--color-live-glow)",
                padding: "10px",
                borderRadius: "var(--radius-md)",
                marginBottom: "var(--space-4)",
                textAlign: "center",
                border: "1px solid rgba(255, 71, 87, 0.2)",
              }}
            >
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">{t("auth.email")}</label>
              <div className="auth-input-wrap">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  className="input-field auth-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">{t("auth.password")}</label>
              <div className="auth-input-wrap">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type="password"
                  className="input-field auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <Link to="/forgot-password" className="auth-forgot-link">
              {t("auth.forgotPassword")}
            </Link>

            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner" style={{ width: 20, height: 20 }} />
              ) : (
                t("auth.loginBtn")
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>{t("auth.orContinueWith")}</span>
          </div>

          <div className="auth-social-buttons">
            <button className="btn btn-secondary auth-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="btn btn-secondary auth-social-btn">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.82 9.31 4.8C10.59 4.78 11.8 5.68 12.6 5.68C13.4 5.68 14.85 4.58 16.36 4.74C17.01 4.77 18.75 5.02 19.87 6.63C19.78 6.7 17.76 7.88 17.78 10.36C17.81 13.33 20.34 14.33 20.37 14.35C20.34 14.42 19.96 15.72 19.06 17.06L18.71 19.5Z" />
              </svg>
              Apple
            </button>
          </div>

          <p className="auth-footer">
            {t("auth.noAccount")}{" "}
            <Link to="/signup">{t("auth.createAccount")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
