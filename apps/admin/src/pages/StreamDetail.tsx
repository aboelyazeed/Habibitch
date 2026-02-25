import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StreamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => navigate(-1)}
          style={{ marginBottom: 12 }}
        >
          ← رجوع
        </button>
        <h1>تفاصيل البث</h1>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div
            style={{
              width: 320,
              height: 180,
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 48, opacity: 0.3 }}>📺</span>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>
              بث مباشر: فورتنايت مع المتابعين 🎮
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 16,
              }}
            >
              <div className="detail-field">
                <div className="field-label">المنشئ</div>
                <div
                  className="field-value"
                  style={{ cursor: "pointer", color: "var(--primary-light)" }}
                  onClick={() => navigate("/users/user-1")}
                >
                  أحمد الغامدي
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">التصنيف</div>
                <div className="field-value">ألعاب</div>
              </div>
              <div className="detail-field">
                <div className="field-label">الحالة</div>
                <div className="field-value">
                  <span className="badge badge-error">🔴 مباشر</span>
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">المشاهدون</div>
                <div className="field-value">2,847</div>
              </div>
              <div className="detail-field">
                <div className="field-label">المدة</div>
                <div className="field-value">1:30:00</div>
              </div>
              <div className="detail-field">
                <div className="field-label">البلاغات</div>
                <div className="field-value">1</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button className="btn btn-danger btn-sm">🛑 إيقاف البث</button>
              <button className="btn btn-outline btn-sm">
                ⚠️ إنذار المنشئ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>💬 آخر رسائل الدردشة</h3>
        <table>
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>الرسالة</th>
              <th>الوقت</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>عمر</td>
              <td>ماشاء الله عليك! 🔥</td>
              <td>منذ دقيقة</td>
              <td>
                <button className="btn btn-outline btn-sm">🗑️ حذف</button>
              </td>
            </tr>
            <tr>
              <td>فاطمة</td>
              <td>أهلاً بالجميع ❤️</td>
              <td>منذ 3 دقائق</td>
              <td>
                <button className="btn btn-outline btn-sm">🗑️ حذف</button>
              </td>
            </tr>
            <tr>
              <td>خالد</td>
              <td>يا سلام على اللعب!</td>
              <td>منذ 5 دقائق</td>
              <td>
                <button className="btn btn-outline btn-sm">🗑️ حذف</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
