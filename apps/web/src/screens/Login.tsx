import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Radio } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { t } from "../i18n";
import { useAuthStore } from "../state/store";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin, isLoading, error } = useAuthStore();
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        await googleLogin(credentialResponse.credential);
        navigate("/");
      } catch (e) {
        console.error("Google login error", e);
      }
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

          <div className="auth-social-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Login Failed')}
                    theme="filled_black"
                    shape="pill"
                    text="continue_with"
                    width="100%"
                />
            </div>
            {/* Apple login placeholder */}
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
