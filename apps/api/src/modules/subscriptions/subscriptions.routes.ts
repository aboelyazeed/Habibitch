import { Router } from "express";
import { authenticate, type AuthRequest } from "../../middleware/auth.js";

const router = Router();

// GET /api/subscriptions/plans
router.get("/plans", (_req, res) => {
  res.json({
    success: true,
    plans: [
      {
        id: "monthly",
        nameAr: "شهري",
        price: 4.99,
        features: ["بدون إعلانات", "شارة مشترك", "إيموجي خاص"],
      },
      {
        id: "yearly",
        nameAr: "سنوي",
        price: 39.99,
        features: ["بدون إعلانات", "شارة مشترك", "إيموجي خاص", "خصم 33%"],
      },
    ],
  });
});

// POST /api/subscriptions/subscribe
router.post("/subscribe", authenticate, (req: AuthRequest, res) => {
  const { planId, creatorId } = req.body;
  res.json({ success: true, message: "تم الاشتراك بنجاح" });
});

// POST /api/subscriptions/cancel
router.post("/cancel", authenticate, (req: AuthRequest, res) => {
  const { subscriptionId } = req.body;
  res.json({ success: true, message: "تم إلغاء الاشتراك" });
});

export { router as subscriptionsRouter };
