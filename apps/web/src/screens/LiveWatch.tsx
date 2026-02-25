import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Eye,
  Heart,
  UserPlus,
  Flag,
  Share2,
  Gift,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";
import { t } from "../i18n";
import { useStreamStore, useUIStore } from "../state/store";
import { MOCK_CHAT_MESSAGES } from "../services/mock-data";
import "./LiveWatch.css";

export default function LiveWatch() {
  const { streamId } = useParams<{ streamId: string }>();
  const { selectStream, selectedStream } = useStreamStore();
  const { openModal } = useUIStore();
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (streamId) selectStream(streamId);
  }, [streamId, selectStream]);

  if (!selectedStream) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner" />
      </div>
    );
  }

  const stream = selectedStream;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        streamId: stream.id,
        userId: "current-user",
        displayName: "مشاهد حبيبي",
        avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Viewer",
        content: chatInput,
        type: "text" as const,
        isSubscriber: false,
        isCreator: false,
        isModerator: false,
        timestamp: new Date().toISOString(),
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="live-watch">
      {/* Main Content Area */}
      <div className="live-watch-main">
        {/* Video Player */}
        <div className="live-player">
          <img
            src={stream.thumbnailUrl}
            alt={stream.title}
            className="live-player-thumbnail"
          />
          <div className="live-player-overlay">
            <div className="live-player-top">
              <span
                className="badge badge-live"
                style={{ fontSize: "14px", padding: "4px 12px" }}
              >
                ● {t("home.live")}
              </span>
              <span className="live-player-viewers">
                <Eye size={16} />
                {stream.viewerCount.toLocaleString("ar-EG")}{" "}
                {t("stream.watching")}
              </span>
            </div>
          </div>
        </div>

        {/* Stream Info */}
        <div className="live-stream-info">
          <div className="live-stream-info-right">
            <img
              src={stream.creatorAvatarUrl}
              alt={stream.creatorName}
              className="avatar avatar-lg avatar-live-ring"
            />
            <div className="live-stream-details">
              <h1 className="live-stream-title">{stream.title}</h1>
              <div className="live-stream-creator">
                <span className="live-stream-creator-name">
                  {stream.creatorName}
                </span>
                {stream.isCreatorVerified && (
                  <BadgeCheck size={16} className="stream-card-verified" />
                )}
                <span className="live-stream-category">
                  {stream.categoryName}
                </span>
              </div>
            </div>
          </div>
          <div className="live-stream-actions">
            <button
              className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"} btn-sm`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <UserPlus size={16} />
              {isFollowing ? t("profile.unfollow") : t("profile.follow")}
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => openModal("gift")}
            >
              <Gift size={16} />
              {t("gifts.title")}
            </button>
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => openModal("report")}
            >
              <Flag size={16} />
            </button>
            <button className="btn btn-ghost btn-icon">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="live-chat-panel">
        <div className="live-chat-header">
          <MessageCircle size={18} />
          <h3>{t("chat.title")}</h3>
          <span className="live-chat-rules">{t("stream.familyFriendly")}</span>
        </div>

        <div className="live-chat-messages">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.isCreator ? "chat-message-creator" : ""}`}
            >
              <img
                src={msg.avatarUrl}
                alt={msg.displayName}
                className="avatar avatar-xs"
              />
              <div className="chat-message-content">
                <span
                  className={`chat-message-name ${msg.isCreator ? "chat-name-creator" : ""} ${msg.isModerator ? "chat-name-mod" : ""} ${msg.isSubscriber ? "chat-name-sub" : ""}`}
                >
                  {msg.displayName}
                  {msg.isCreator && (
                    <span className="chat-badge-creator">منشئ</span>
                  )}
                  {msg.isModerator && (
                    <span className="chat-badge-mod">مشرف</span>
                  )}
                  {msg.isSubscriber && (
                    <span className="chat-badge-sub">⭐</span>
                  )}
                </span>
                <span className="chat-message-text">{msg.content}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reaction Bar */}
        <div className="live-chat-reactions">
          {["❤️", "🔥", "👏", "⭐", "😂"].map((emoji) => (
            <button key={emoji} className="chat-reaction-btn">
              {emoji}
            </button>
          ))}
        </div>

        <form className="live-chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="input-field live-chat-input"
            placeholder={t("chat.sendMessage")}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            {t("gifts.send")}
          </button>
        </form>
      </div>
    </div>
  );
}
