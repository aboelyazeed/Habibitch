import { Link } from "react-router-dom";
import { Eye, BadgeCheck } from "lucide-react";
import { t } from "../../i18n";
import "./StreamCard.css";

interface StreamCardProps {
  id: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  isCreatorVerified: boolean;
  title: string;
  categoryName: string;
  thumbnailUrl?: string;
  viewerCount: number;
  startedAt: string;
}

export default function StreamCard({
  id,
  creatorName,
  creatorAvatarUrl,
  isCreatorVerified,
  title,
  categoryName,
  thumbnailUrl,
  viewerCount,
}: StreamCardProps) {
  return (
    <Link to={`/live/${id}`} className="stream-card">
      <div className="stream-card-thumbnail">
        <img src={thumbnailUrl} alt={title} className="stream-card-img" />
        <div className="stream-card-overlay">
          <span className="badge badge-live">{t("home.live")}</span>
          <span className="stream-card-viewers">
            <Eye size={14} />
            {viewerCount.toLocaleString("ar-EG")}
          </span>
        </div>
      </div>
      <div className="stream-card-info">
        <img
          src={creatorAvatarUrl}
          alt={creatorName}
          className="avatar avatar-md stream-card-avatar"
        />
        <div className="stream-card-text">
          <h3 className="stream-card-title">{title}</h3>
          <div className="stream-card-creator">
            <span>{creatorName}</span>
            {isCreatorVerified && (
              <BadgeCheck size={14} className="stream-card-verified" />
            )}
          </div>
          <span className="stream-card-category">{categoryName}</span>
        </div>
      </div>
    </Link>
  );
}
