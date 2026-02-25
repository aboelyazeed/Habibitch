import { useState } from "react";
import { useParams } from "react-router-dom";
import { BadgeCheck, UserPlus, UserMinus, Gift, Bell } from "lucide-react";
import { t } from "../i18n";
import { MOCK_STREAMS } from "../services/mock-data";
import StreamCard from "../components/stream/StreamCard";
import "./CreatorProfile.css";

export default function CreatorProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);

  // Find creator from mock data
  const creator = MOCK_STREAMS.find((s) => s.creatorId === userId);
  const creatorStreams = MOCK_STREAMS.filter((s) => s.creatorId === userId);

  if (!creator) {
    return (
      <div className="empty-state">
        <h2 className="empty-state-title">المنشئ غير موجود</h2>
      </div>
    );
  }

  return (
    <div className="creator-profile-page">
      {/* Banner */}
      <div className="creator-banner">
        <div className="creator-banner-overlay" />
        <div className="creator-banner-glow" />
      </div>

      {/* Profile Info */}
      <div className="creator-info-section">
        <div className="creator-avatar-wrap">
          <img
            src={creator.creatorAvatarUrl}
            alt={creator.creatorName}
            className="avatar avatar-2xl avatar-ring"
          />
          {creator.status === "live" && (
            <span className="badge badge-live creator-live-badge">
              {t("home.live")}
            </span>
          )}
        </div>

        <div className="creator-info">
          <div className="creator-name-row">
            <h1 className="creator-name">{creator.creatorName}</h1>
            {creator.isCreatorVerified && (
              <BadgeCheck size={22} className="stream-card-verified" />
            )}
          </div>
          <p className="creator-bio">
            منشئ محتوى عربي هادف ومسلّي — محتوى حلال 100%
          </p>
          <div className="creator-stats">
            <div className="creator-stat">
              <span className="creator-stat-value">
                {(Math.floor(Math.random() * 50000) + 1000).toLocaleString(
                  "ar-EG",
                )}
              </span>
              <span className="creator-stat-label">
                {t("profile.followers")}
              </span>
            </div>
            <div className="creator-stat">
              <span className="creator-stat-value">
                {Math.floor(Math.random() * 200 + 10).toLocaleString("ar-EG")}
              </span>
              <span className="creator-stat-label">
                {t("profile.following")}
              </span>
            </div>
          </div>
        </div>

        <div className="creator-actions">
          <button
            className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? <UserMinus size={18} /> : <UserPlus size={18} />}
            {isFollowing ? t("profile.unfollow") : t("profile.follow")}
          </button>
          <button className="btn btn-secondary">
            <Gift size={18} />
            {t("subscription.subscribe")}
          </button>
          <button className="btn btn-ghost btn-icon">
            <Bell size={18} />
          </button>
        </div>
      </div>

      {/* Creator's Streams */}
      <div className="creator-streams">
        <h2
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            marginBottom: "var(--space-6)",
          }}
        >
          {creator.status === "live"
            ? t("profile.liveNow")
            : t("home.recommended")}
        </h2>
        <div className="stream-grid">
          {creatorStreams.map((s) => (
            <StreamCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}
