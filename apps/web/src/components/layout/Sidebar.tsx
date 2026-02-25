import { NavLink } from "react-router-dom";
import { Home, Users, Grid3X3, Compass, Settings } from "lucide-react";
import { t } from "../../i18n";
import { useUIStore } from "../../state/store";
import { MOCK_STREAMS } from "../../services/mock-data";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: () => t("nav.home") },
  { to: "/following", icon: Users, label: () => t("nav.following") },
  { to: "/categories", icon: Grid3X3, label: () => t("nav.categories") },
  { to: "/settings", icon: Settings, label: () => t("nav.settings") },
];

// Show some "followed" creators in sidebar
const FOLLOWED_CREATORS = MOCK_STREAMS.slice(0, 5).map((s) => ({
  id: s.creatorId,
  name: s.creatorName,
  avatar: s.creatorAvatarUrl,
  isLive: true,
  viewerCount: s.viewerCount,
  category: s.categoryName,
}));

export default function Sidebar() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
            end={item.to === "/"}
          >
            <item.icon size={20} />
            {!sidebarCollapsed && <span>{item.label()}</span>}
          </NavLink>
        ))}
      </nav>

      {!sidebarCollapsed && (
        <>
          <div className="sidebar-divider" />
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">
              <Compass size={16} />
              {t("nav.following")}
            </h3>
            <div className="sidebar-creators">
              {FOLLOWED_CREATORS.map((creator) => (
                <NavLink
                  key={creator.id}
                  to={`/creator/${creator.id}`}
                  className="sidebar-creator"
                >
                  <div className="sidebar-creator-avatar-wrap">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="avatar avatar-sm"
                    />
                    {creator.isLive && (
                      <span className="live-dot sidebar-live-dot" />
                    )}
                  </div>
                  <div className="sidebar-creator-info">
                    <span className="sidebar-creator-name">{creator.name}</span>
                    <span className="sidebar-creator-meta">
                      {creator.isLive ? (
                        <>
                          <span className="sidebar-creator-category">
                            {creator.category}
                          </span>
                          <span className="sidebar-creator-viewers">
                            {creator.viewerCount.toLocaleString("ar-EG")}
                          </span>
                        </>
                      ) : (
                        t("profile.offline")
                      )}
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
