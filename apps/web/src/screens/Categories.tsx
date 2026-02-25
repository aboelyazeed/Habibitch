import { Link } from "react-router-dom";
import { HALAL_CATEGORIES } from "@habibi/shared";
import { t } from "../i18n";
import "./Categories.css";

export default function Categories() {
  return (
    <div className="categories-page">
      <h1 className="categories-title">{t("categories.title")}</h1>
      <div className="category-grid">
        {HALAL_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="category-card"
          >
            <span className="category-card-icon">{cat.icon}</span>
            <span className="category-card-name">{cat.nameAr}</span>
            <span className="category-card-count">
              {Math.floor(Math.random() * 50 + 5)} {t("categories.streams")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
