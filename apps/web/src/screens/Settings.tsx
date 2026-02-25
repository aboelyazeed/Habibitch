import { Link } from "react-router-dom";
import {
  User,
  Bell,
  Globe,
  ShieldBan,
  BookOpen,
  HelpCircle,
  Info,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import { t } from "../i18n";
import "./Settings.css";

const SETTINGS_ITEMS = [
  {
    to: "/profile",
    icon: User,
    label: () => t("settings.account"),
    desc: "تعديل الملف الشخصي والبريد الإلكتروني",
  },
  {
    to: "#",
    icon: Bell,
    label: () => t("settings.notifications"),
    desc: "إدارة إشعارات البث والدردشة",
  },
  {
    to: "#",
    icon: Globe,
    label: () => t("settings.language"),
    desc: "العربية (افتراضي)",
  },
  {
    to: "/settings/blocked",
    icon: ShieldBan,
    label: () => t("settings.blockedUsers"),
    desc: "إدارة قائمة المحظورين",
  },
  {
    to: "#",
    icon: BookOpen,
    label: () => t("settings.contentGuidelines"),
    desc: "إرشادات المحتوى الحلال",
  },
  {
    to: "#",
    icon: HelpCircle,
    label: () => t("settings.help"),
    desc: "الأسئلة الشائعة والدعم",
  },
  {
    to: "#",
    icon: Info,
    label: () => t("settings.about"),
    desc: "حول حبيبي ستريم",
  },
];

export default function Settings() {
  return (
    <div className="settings-page">
      <h1 className="settings-title">{t("settings.title")}</h1>
      <div className="settings-list">
        {SETTINGS_ITEMS.map((item, i) => (
          <Link key={i} to={item.to} className="settings-item">
            <div className="settings-item-icon">
              <item.icon size={20} />
            </div>
            <div className="settings-item-info">
              <span className="settings-item-label">{item.label()}</span>
              <span className="settings-item-desc">{item.desc}</span>
            </div>
            <ChevronLeft size={18} className="settings-item-arrow" />
          </Link>
        ))}
      </div>
      <button className="btn btn-danger settings-delete-btn">
        <Trash2 size={16} />
        {t("settings.deleteAccount")}
      </button>
    </div>
  );
}
