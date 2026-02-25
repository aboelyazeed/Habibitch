import { useEffect } from "react";
import { t } from "../i18n";
import { useStreamStore } from "../state/store";
import StreamCard from "../components/stream/StreamCard";
import "./Home.css";

export default function Home() {
  const { streams, isLoading, fetchStreams } = useStreamStore();

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            <span className="home-hero-accent">حبيبي ستريم</span>
            <br />
            {t("auth.welcomeSubtitle")}
          </h1>
          <p className="home-hero-subtitle">
            اكتشف أفضل المحتوى العربي المباشر — ألعاب، تعليم، طبخ، وأكثر
          </p>
        </div>
        <div className="home-hero-glow" />
      </section>

      {/* Tab Navigation */}
      <div className="home-tabs">
        <button className="tab active">{t("home.forYou")}</button>
        <button className="tab">{t("home.trending")}</button>
      </div>

      {/* Stream Grid */}
      {isLoading ? (
        <div
          className="flex justify-center"
          style={{ padding: "var(--space-16)" }}
        >
          <div className="spinner" />
        </div>
      ) : (
        <div className="stream-grid">
          {streams.map((stream) => (
            <StreamCard
              key={stream.id}
              id={stream.id}
              creatorName={stream.creatorName}
              creatorAvatarUrl={stream.creatorAvatarUrl}
              isCreatorVerified={stream.isCreatorVerified}
              title={stream.title}
              categoryName={stream.categoryName}
              thumbnailUrl={stream.thumbnailUrl}
              viewerCount={stream.viewerCount}
              startedAt={stream.startedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
