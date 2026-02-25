import { useEffect } from "react";
import { t } from "../i18n";
import { useStreamStore } from "../state/store";
import StreamCard from "../components/stream/StreamCard";
import { Users } from "lucide-react";

export default function Following() {
  const { followedStreams, fetchStreams, isLoading } = useStreamStore();

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  return (
    <div className="home-page">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          marginBottom: "var(--space-8)",
        }}
      >
        <Users size={24} className="text-muted" />
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800 }}>
          {t("nav.following")}
        </h1>
      </div>
      {isLoading ? (
        <div
          className="flex justify-center"
          style={{ padding: "var(--space-16)" }}
        >
          <div className="spinner" />
        </div>
      ) : followedStreams.length === 0 ? (
        <div className="empty-state">
          <Users size={64} className="empty-state-icon" />
          <h2 className="empty-state-title">{t("home.noStreams")}</h2>
          <p className="empty-state-description">{t("home.noStreamsDesc")}</p>
        </div>
      ) : (
        <div className="stream-grid">
          {followedStreams.map((stream) => (
            <StreamCard key={stream.id} {...stream} />
          ))}
        </div>
      )}
    </div>
  );
}
