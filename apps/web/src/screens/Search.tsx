import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { t } from "../i18n";
import { useStreamStore } from "../state/store";
import StreamCard from "../components/stream/StreamCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const { streams, fetchStreams } = useStreamStore();

  useEffect(() => {
    if (streams.length === 0) fetchStreams();
  }, [streams.length, fetchStreams]);

  const filteredStreams = query.trim()
    ? streams.filter(
        (s) =>
          s.title.includes(query) ||
          s.creatorName.includes(query) ||
          s.categoryName.includes(query),
      )
    : [];

  return (
    <div className="home-page">
      <h1
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: 800,
          marginBottom: "var(--space-6)",
        }}
      >
        {t("search.results")}
      </h1>

      <div style={{ marginBottom: "var(--space-8)", maxWidth: 600 }}>
        <div style={{ position: "relative" }}>
          <SearchIcon
            size={18}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-muted)",
            }}
          />
          <input
            type="text"
            className="input-field"
            style={{ paddingRight: 44, borderRadius: "var(--radius-full)" }}
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {query.trim() === "" ? null : filteredStreams.length === 0 ? (
        <div className="empty-state">
          <SearchIcon size={64} className="empty-state-icon" />
          <h2 className="empty-state-title">{t("search.noResults")}</h2>
          <p className="empty-state-description">{t("search.noResultsDesc")}</p>
        </div>
      ) : (
        <div className="stream-grid">
          {filteredStreams.map((stream) => (
            <StreamCard key={stream.id} {...stream} />
          ))}
        </div>
      )}
    </div>
  );
}
