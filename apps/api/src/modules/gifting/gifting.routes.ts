import { Router } from "express";
import { authenticate, type AuthRequest } from "../../middleware/auth.js";

const router = Router();

// GET /api/gifting/tiers
router.get("/tiers", (_req, res) => {
  res.json({
    success: true,
    tiers: [
      { id: "rose", nameAr: "وردة", icon: "🌹", cost: 5 },
      { id: "star", nameAr: "نجمة", icon: "⭐", cost: 25 },
      { id: "diamond", nameAr: "ماسة", icon: "💎", cost: 50 },
      { id: "rocket", nameAr: "صاروخ", icon: "🚀", cost: 100 },
      { id: "crown", nameAr: "تاج", icon: "👑", cost: 500 },
    ],
  });
});

// POST /api/gifting/send
router.post("/send", authenticate, (req: AuthRequest, res) => {
  const { giftId, targetUserId, streamId } = req.body;
  res.json({ success: true, message: "تم إرسال الهدية بنجاح" });
});

export { router as giftingRouter };
