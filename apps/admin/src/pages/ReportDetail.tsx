import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => navigate("/reports")}
          style={{ marginBottom: 12 }}
        >
          ← رجوع للبلاغات
        </button>
        <h1>بلاغ #{id}</h1>
      </div>

      <div className="detail-grid">
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>معلومات البلاغ</h3>
          <div
            className="detail-grid"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <div className="detail-field">
              <div className="field-label">المبلِّغ</div>
              <div className="field-value">عمر أحمد</div>
            </div>
            <div className="detail-field">
              <div className="field-label">التاريخ</div>
              <div className="field-value">2025-02-25</div>
            </div>
            <div className="detail-field">
              <div className="field-label">السبب</div>
              <div className="field-value">محتوى غير لائق</div>
            </div>
            <div className="detail-field">
              <div className="field-label">الأولوية</div>
              <div className="field-value">
                <span className="badge badge-error">عالية</span>
              </div>
            </div>
            <div className="detail-field">
              <div className="field-label">الحالة</div>
              <div className="field-value">
                <span className="badge badge-warning">معلق</span>
              </div>
            </div>
            <div className="detail-field">
              <div className="field-label">الهدف</div>
              <div
                className="field-value"
                style={{ cursor: "pointer", color: "var(--primary-light)" }}
                onClick={() => navigate("/streams/stream-1")}
              >
                بث: ألعاب مباشر
              </div>
            </div>
          </div>
          <div className="detail-field" style={{ marginTop: 16 }}>
            <div className="field-label">وصف المشكلة</div>
            <div className="field-value">
              المحتوى يحتوي على كلمات مسيئة ولا يناسب المنصة. الرجاء المراجعة
              والتصرف.
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>الإجراءات</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button className="btn btn-primary">
              ✅ تأكيد البلاغ وإنذار المستخدم
            </button>
            <button className="btn btn-danger">
              🚫 إيقاف البث وحظر المستخدم
            </button>
            <button className="btn btn-outline">❌ رفض البلاغ</button>
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/users/user-1`)}
            >
              👤 عرض ملف المُبلَّغ عنه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
