import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Radio } from "lucide-react";
import { t } from "../i18n";
import { useAuthStore } from "../state/store";
import "./Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email, password, displayName);
    setTimeout(() => navigate("/create-profile"), 900);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-glow auth-glow-1" />
        <div className="auth-glow auth-glow-2" />

        <div className="auth-card card-glass">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Radio size={28} />
            </div>
            <h1 className="auth-logo-text">حبيبي ستريم</h1>
          </div>

          <h2 className="auth-title">{t("auth.signupTitle")}</h2>
          <p className="auth-subtitle">{t("auth.welcomeSubtitle")}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">{t("auth.displayName")}</label>
              <div className="auth-input-wrap">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  className="input-field auth-input"
                  placeholder="اسم العرض"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            </div>

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

            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner" style={{ width: 20, height: 20 }} />
              ) : (
                t("auth.createAccount")
              )}
            </button>
          </form>

          <p className="auth-terms">
            {t("auth.agreeTerms")} <a href="#">{t("auth.terms")}</a>{" "}
            {t("auth.and")} <a href="#">{t("auth.privacy")}</a>
          </p>

          <p className="auth-footer">
            {t("auth.hasAccount")} <Link to="/login">{t("auth.loginBtn")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
