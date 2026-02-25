import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStreamStore } from "../state/store";
import StreamCard from "../components/stream/StreamCard";
import { HALAL_CATEGORIES } from "@habibi/shared";
import { t } from "../i18n";

export default function CategoryResults() {
  const { slug } = useParams<{ slug: string }>();
  const { streams, fetchStreams } = useStreamStore();

  useEffect(() => {
    if (streams.length === 0) fetchStreams();
  }, [streams.length, fetchStreams]);

  const category = HALAL_CATEGORIES.find((c) => c.slug === slug);
  const categoryStreams = streams.filter((s) => s.categoryId === category?.id);

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
        <span style={{ fontSize: "2rem" }}>{category?.icon}</span>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800 }}>
            {category?.nameAr || slug}
          </h1>
          <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
            {categoryStreams.length} {t("categories.streams")}
          </p>
        </div>
      </div>
      {categoryStreams.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-state-title">{t("home.noStreams")}</h2>
        </div>
      ) : (
        <div className="stream-grid">
          {categoryStreams.map((stream) => (
            <StreamCard key={stream.id} {...stream} />
          ))}
        </div>
      )}
    </div>
  );
}
