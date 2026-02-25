import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockReports = [
  {
    id: "r-1",
    reporter: "عمر أحمد",
    target: "بث: ألعاب مباشر",
    reason: "محتوى غير لائق",
    status: "pending",
    date: "2025-02-25",
    priority: "high",
  },
  {
    id: "r-2",
    reporter: "فاطمة خالد",
    target: "مستخدم: user_456",
    reason: "تحرش وتنمر",
    status: "pending",
    date: "2025-02-25",
    priority: "high",
  },
  {
    id: "r-3",
    reporter: "خالد محمد",
    target: "بث: طبخ عربي",
    reason: "محتوى مزعج",
    status: "reviewing",
    date: "2025-02-24",
    priority: "medium",
  },
  {
    id: "r-4",
    reporter: "مريم سعيد",
    target: "رسالة دردشة",
    reason: "عنف أو تهديد",
    status: "reviewing",
    date: "2025-02-24",
    priority: "high",
  },
  {
    id: "r-5",
    reporter: "أحمد علي",
    target: "بث: رياضة",
    reason: "محتوى مزعج",
    status: "resolved",
    date: "2025-02-23",
    priority: "low",
  },
  {
    id: "r-6",
    reporter: "نور حسن",
    target: "مستخدم: spammer99",
    reason: "حسابات مزيفة",
    status: "resolved",
    date: "2025-02-23",
    priority: "medium",
  },
];

export default function ReportsQueuePage() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filtered =
    filter === "all"
      ? mockReports
      : mockReports.filter((r) => r.status === filter);

  return (
    <div>
      <div className="page-header">
        <h1>⚠️ قائمة البلاغات</h1>
        <p>
          {mockReports.filter((r) => r.status === "pending").length} بلاغ معلق
          يحتاج مراجعة
        </p>
      </div>

      <div className="filters-bar">
        {[
          { key: "all", label: "الكل" },
          { key: "pending", label: "معلق" },
          { key: "reviewing", label: "قيد المراجعة" },
          { key: "resolved", label: "تم الحل" },
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
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>المبلِّغ</th>
                <th>الهدف</th>
                <th>السبب</th>
                <th>الأولوية</th>
                <th>الحالة</th>
                <th>التاريخ</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((report) => (
                <tr key={report.id}>
                  <td>{report.reporter}</td>
                  <td>{report.target}</td>
                  <td>{report.reason}</td>
                  <td>
                    <span
                      className={`badge ${report.priority === "high" ? "badge-error" : report.priority === "medium" ? "badge-warning" : "badge-info"}`}
                    >
                      {report.priority === "high"
                        ? "عالية"
                        : report.priority === "medium"
                          ? "متوسطة"
                          : "منخفضة"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${report.status === "pending" ? "badge-warning" : report.status === "reviewing" ? "badge-info" : "badge-success"}`}
                    >
                      {report.status === "pending"
                        ? "معلق"
                        : report.status === "reviewing"
                          ? "قيد المراجعة"
                          : "تم الحل"}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>{report.date}</td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => navigate(`/reports/${report.id}`)}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
