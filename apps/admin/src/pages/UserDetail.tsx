import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserDetailPage() {
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
        <h1>تفاصيل المستخدم</h1>
      </div>

      <div className="detail-header">
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${id}`}
          className="avatar avatar-lg"
          alt=""
        />
        <div className="detail-info">
          <h2>أحمد الغامدي</h2>
          <p style={{ color: "var(--text-muted)" }}>
            @ahmed_ghamdi • انضم في يناير 2025
          </p>
          <div className="detail-actions">
            <button className="btn btn-outline btn-sm">📧 إرسال رسالة</button>
            <button className="btn btn-outline btn-sm">⚠️ إنذار</button>
            <button className="btn btn-danger btn-sm">🚫 حظر</button>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>معلومات الحساب</h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div className="detail-field">
              <div className="field-label">البريد</div>
              <div className="field-value">ahmed@example.com</div>
            </div>
            <div className="detail-field">
              <div className="field-label">الحالة</div>
              <div className="field-value">
                <span className="badge badge-success">نشط</span>
              </div>
            </div>
            <div className="detail-field">
              <div className="field-label">الدور</div>
              <div className="field-value">
                <span className="badge badge-primary">منشئ موثق</span>
              </div>
            </div>
            <div className="detail-field">
              <div className="field-label">المتابعون</div>
              <div className="field-value">12,500</div>
            </div>
            <div className="detail-field">
              <div className="field-label">البثوث</div>
              <div className="field-value">89</div>
            </div>
            <div className="detail-field">
              <div className="field-label">الإنذارات</div>
              <div className="field-value">0</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>إحصائيات</h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div className="detail-field">
              <div className="field-label">إجمالي المشاهدات</div>
              <div className="field-value">245,000</div>
            </div>
            <div className="detail-field">
              <div className="field-label">متوسط المشاهدين</div>
              <div className="field-value">2,847</div>
            </div>
            <div className="detail-field">
              <div className="field-label">الهدايا المستلمة</div>
              <div className="field-value">$1,234</div>
            </div>
            <div className="detail-field">
              <div className="field-label">البلاغات ضده</div>
              <div className="field-value">1</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>آخر البثوث</h3>
        <table>
          <thead>
            <tr>
              <th>العنوان</th>
              <th>التصنيف</th>
              <th>المشاهدون</th>
              <th>المدة</th>
              <th>التاريخ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>بث فورتنايت مع المتابعين 🎮</td>
              <td>ألعاب</td>
              <td>2,847</td>
              <td>3:22:00</td>
              <td>2025-02-25</td>
            </tr>
            <tr>
              <td>سولو رانكد 💪</td>
              <td>ألعاب</td>
              <td>1,900</td>
              <td>2:10:00</td>
              <td>2025-02-24</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
