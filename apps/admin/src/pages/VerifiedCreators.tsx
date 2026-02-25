import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockCreators = [
  {
    id: "user-1",
    name: "أحمد الغامدي",
    category: "ألعاب",
    followers: "12.5K",
    streams: 89,
    status: "verified",
    avatar: "Ahmed",
  },
  {
    id: "user-2",
    name: "سارة المهندسة",
    category: "تكنولوجيا",
    followers: "8.2K",
    streams: 45,
    status: "verified",
    avatar: "Sara",
  },
  {
    id: "user-4",
    name: "نور العلم",
    category: "تعليم",
    followers: "15.1K",
    streams: 120,
    status: "verified",
    avatar: "Noor",
  },
  {
    id: "user-6",
    name: "ياسمين الفنانة",
    category: "فن وتصميم",
    followers: "6.8K",
    streams: 34,
    status: "verified",
    avatar: "Yasmine",
  },
  {
    id: "user-7",
    name: "شيخ عبدالله",
    category: "محتوى إسلامي",
    followers: "25.3K",
    streams: 200,
    status: "verified",
    avatar: "Abdullah",
  },
  {
    id: "user-10",
    name: "جمال الرسام",
    category: "فن وتصميم",
    followers: "3.2K",
    streams: 15,
    status: "pending",
    avatar: "Jamal",
  },
  {
    id: "user-11",
    name: "هدى الطباخة",
    category: "طبخ",
    followers: "4.5K",
    streams: 28,
    status: "pending",
    avatar: "Huda",
  },
];

export default function VerifiedCreatorsPage() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const filtered =
    filter === "all"
      ? mockCreators
      : mockCreators.filter((c) => c.status === filter);

  return (
    <div>
      <div className="page-header">
        <h1>✅ إدارة المنشئين الموثقين</h1>
        <p>
          {mockCreators.filter((c) => c.status === "pending").length} طلب توثيق
          بانتظار المراجعة
        </p>
      </div>

      <div className="filters-bar">
        {[
          { key: "all", label: "الكل" },
          { key: "verified", label: "موثق" },
          { key: "pending", label: "بانتظار التوثيق" },
        ].map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>المنشئ</th>
              <th>التصنيف</th>
              <th>المتابعون</th>
              <th>البثوث</th>
              <th>الحالة</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((creator) => (
              <tr key={creator.id}>
                <td style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${creator.avatar}`}
                    className="avatar"
                    alt=""
                  />
                  {creator.name}
                </td>
                <td>{creator.category}</td>
                <td>{creator.followers}</td>
                <td>{creator.streams}</td>
                <td>
                  <span
                    className={`badge ${creator.status === "verified" ? "badge-success" : "badge-warning"}`}
                  >
                    {creator.status === "verified" ? "✓ موثق" : "⏳ بانتظار"}
                  </span>
                </td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => navigate(`/users/${creator.id}`)}
                  >
                    عرض
                  </button>
                  {creator.status === "pending" && (
                    <>
                      <button className="btn btn-primary btn-sm">
                        ✅ توثيق
                      </button>
                      <button className="btn btn-outline btn-sm">❌ رفض</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
