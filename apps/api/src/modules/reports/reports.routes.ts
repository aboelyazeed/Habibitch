import { Router } from "express";
import { authenticate, type AuthRequest } from "../../middleware/auth.js";
import { v4 as uuid } from "uuid";

const router = Router();

const reports: {
  id: string;
  reporterId: string;
  targetType: string;
  targetId: string;
  reason: string;
  description: string;
  status: string;
  createdAt: string;
}[] = [];

// POST /api/reports
router.post("/", authenticate, (req: AuthRequest, res) => {
  const { targetType, targetId, reason, description } = req.body;
  const report = {
    id: uuid(),
    reporterId: req.userId!,
    targetType,
    targetId,
    reason,
    description,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  reports.push(report);
  res.status(201).json({ success: true, report });
});

// GET /api/reports (admin only)
router.get("/", authenticate, (req: AuthRequest, res) => {
  const status = req.query.status as string;
  const filtered = status
    ? reports.filter((r) => r.status === status)
    : reports;
  res.json({ success: true, reports: filtered });
});

// PUT /api/reports/:id (admin resolve)
router.put("/:id", authenticate, (req: AuthRequest, res) => {
  const report = reports.find((r) => r.id === req.params.id);
  if (!report)
    return res.status(404).json({ success: false, error: "البلاغ غير موجود" });
  report.status = req.body.status || "resolved";
  res.json({ success: true, report });
});

export { router as reportsRouter };
