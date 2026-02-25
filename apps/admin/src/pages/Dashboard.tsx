import React from "react";

const stats = [
  {
    label: "المستخدمين النشطين",
    value: "12,847",
    change: "+8.2%",
    positive: true,
  },
  { label: "البثوث النشطة", value: "342", change: "+12%", positive: true },
  { label: "البلاغات المعلقة", value: "23", change: "-5%", positive: true },
  {
    label: "الإيرادات اليومية",
    value: "$4,521",
    change: "+3.7%",
    positive: true,
  },
];

const recentReports = [
  {
    id: "r-1",
    user: "مستخدم_123",
    reason: "محتوى غير لائق",
    stream: "بث ألعاب",
    status: "pending",
    time: "منذ 5 دقائق",
  },
  {
    id: "r-2",
    user: "مستخدم_456",
    reason: "تحرش",
    stream: "بث دردشة",
    status: "reviewing",
    time: "منذ 15 دقيقة",
  },
  {
    id: "r-3",
    user: "مستخدم_789",
    reason: "محتوى مزعج",
    stream: "بث طبخ",
    status: "resolved",
    time: "منذ ساعة",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="page-header">
        <h1>لوحة التحكم</h1>
        <p>نظرة عامة على منصة حبيبي ستريم</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="card stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div
              className={`stat-change ${stat.positive ? "positive" : "negative"}`}
            >
              {stat.change} من الأمس
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>⚠️ آخر البلاغات</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>المبلِّغ</th>
                <th>السبب</th>
                <th>البث</th>
                <th>الحالة</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.user}</td>
                  <td>{report.reason}</td>
                  <td>{report.stream}</td>
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
                  <td style={{ color: "var(--text-muted)" }}>{report.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
