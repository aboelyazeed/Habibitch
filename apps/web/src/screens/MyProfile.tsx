import { t } from "../i18n";
import { useAuthStore } from "../state/store";
import { BadgeCheck, Edit2 } from "lucide-react";
import { MOCK_CURRENT_USER } from "../services/mock-data";
import "./MyProfile.css";

export default function MyProfile() {
  const { user } = useAuthStore();
  const profile = user || MOCK_CURRENT_USER;

  return (
    <div className="my-profile-page">
      <div className="my-profile-card card-glass">
        <div className="my-profile-banner" />
        <div className="my-profile-content">
          <div className="my-profile-avatar-wrap">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="avatar avatar-2xl"
            />
          </div>
          <div className="my-profile-info">
            <div className="my-profile-name-row">
              <h1>{profile.displayName}</h1>
              {profile.isVerified && (
                <BadgeCheck size={22} className="stream-card-verified" />
              )}
            </div>
            <p className="my-profile-bio">{profile.bio || ""}</p>
            <div className="my-profile-stats">
              <div className="creator-stat">
                <span className="creator-stat-value">
                  {profile.followerCount.toLocaleString("ar-EG")}
                </span>
                <span className="creator-stat-label">
                  {t("profile.followers")}
                </span>
              </div>
              <div className="creator-stat">
                <span className="creator-stat-value">
                  {profile.followingCount.toLocaleString("ar-EG")}
                </span>
                <span className="creator-stat-label">
                  {t("profile.following")}
                </span>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              style={{ marginTop: "var(--space-4)" }}
            >
              <Edit2 size={16} />
              {t("profile.editProfile")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
