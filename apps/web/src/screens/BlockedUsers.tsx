import { useState } from "react";
import { t } from "../i18n";
import { ShieldBan, UserX } from "lucide-react";

const MOCK_BLOCKED = [
  {
    id: "b1",
    userId: "u100",
    displayName: "مستخدم مزعج",
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Blocked1",
    blockedAt: "٢٠٢٥/٠٢/٢٠",
  },
  {
    id: "b2",
    userId: "u101",
    displayName: "سبامر",
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Blocked2",
    blockedAt: "٢٠٢٥/٠٢/١٨",
  },
];

export default function BlockedUsers() {
  const [blocked, setBlocked] = useState(MOCK_BLOCKED);

  return (
    <div className="settings-page">
      <h1 className="settings-title">
        <ShieldBan
          size={24}
          style={{ display: "inline", marginLeft: 8, verticalAlign: "middle" }}
        />
        {t("profile.blockedUsers")}
      </h1>
      {blocked.length === 0 ? (
        <div className="empty-state">
          <ShieldBan size={64} className="empty-state-icon" />
          <h2 className="empty-state-title">لا يوجد مستخدمون محظورون</h2>
        </div>
      ) : (
        <div className="settings-list">
          {blocked.map((user) => (
            <div
              key={user.id}
              className="settings-item"
              style={{ cursor: "default" }}
            >
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="avatar avatar-md"
              />
              <div className="settings-item-info">
                <span className="settings-item-label">{user.displayName}</span>
                <span className="settings-item-desc">
                  {t("profile.block")} — {user.blockedAt}
                </span>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  setBlocked((prev) => prev.filter((b) => b.id !== user.id))
                }
              >
                <UserX size={14} />
                {t("profile.unblock")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
