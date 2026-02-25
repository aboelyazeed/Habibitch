import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, User, Radio } from "lucide-react";
import { t } from "../i18n";
import "./Auth.css";

export default function CreateProfile() {
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
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
          </div>

          <h2 className="auth-title">{t("profile.createProfile")}</h2>
          <p className="auth-subtitle">أكمل ملفك الشخصي للبدء</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Avatar Upload */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "var(--space-4)",
              }}
            >
              <div
                className="avatar-placeholder avatar-2xl"
                style={{ cursor: "pointer", position: "relative" }}
              >
                <Camera size={28} />
                <span
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                    background: "var(--color-primary)",
                    borderRadius: "var(--radius-full)",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid var(--color-bg-primary)",
                  }}
                >
                  <Camera size={12} />
                </span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">{t("auth.displayName")}</label>
              <div className="auth-input-wrap">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  className="input-field auth-input"
                  placeholder="اختر اسماً مميزاً"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">{t("profile.bio")}</label>
              <textarea
                className="input-field"
                rows={3}
                placeholder="أخبرنا عن نفسك (اختياري)"
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
            >
              {t("common.done")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
