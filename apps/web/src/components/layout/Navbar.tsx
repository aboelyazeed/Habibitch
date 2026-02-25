import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Wallet, Bell, Menu, X, Radio } from "lucide-react";
import { t } from "../../i18n";
import { useAuthStore } from "../../state/store";
import { useWalletStore } from "../../state/store";
import { useUIStore } from "../../state/store";
import "./Navbar.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { balance } = useWalletStore();
  const { toggleSidebar, sidebarCollapsed } = useUIStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Right side: Logo + Sidebar toggle */}
        <div className="navbar-right">
          <button
            className="btn btn-icon btn-ghost"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Radio size={22} />
            </div>
            <span className="navbar-logo-text">حبيبي ستريم</span>
          </Link>
        </div>

        {/* Center: Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <Search size={18} className="navbar-search-icon" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Left side: Actions */}
        <div className="navbar-left">
          {isAuthenticated ? (
            <>
              <Link to="/wallet" className="navbar-wallet">
                <Wallet size={18} />
                <span className="navbar-wallet-balance">
                  {balance.toLocaleString("ar-EG")}
                </span>
                <span className="navbar-wallet-coin">🪙</span>
              </Link>
              <button className="btn btn-icon btn-ghost navbar-notification">
                <Bell size={20} />
                <span className="notification-dot" />
              </button>
              <Link to="/profile" className="navbar-avatar-link">
                <img
                  src={user?.avatarUrl}
                  alt={user?.displayName}
                  className="avatar avatar-sm"
                />
              </Link>
              <button className="btn btn-sm btn-ghost" onClick={logout}>
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-secondary">
                {t("nav.login")}
              </Link>
              <Link to="/signup" className="btn btn-sm btn-primary">
                {t("nav.signup")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
