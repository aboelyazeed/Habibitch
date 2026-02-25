import { Router } from "express";
import { authenticate, type AuthRequest } from "../../middleware/auth.js";
import { v4 as uuid } from "uuid";

const router = Router();

export const streams = [
  {
    id: "stream-1",
    creatorId: "user-1",
    creatorName: "أحمد الغامدي",
    title: "بث مباشر: فورتنايت مع المتابعين 🎮",
    categoryId: "gaming",
    categoryName: "ألعاب",
    thumbnailUrl: "https://picsum.photos/seed/stream1/640/360",
    status: "live",
    viewerCount: 2847,
    startedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "stream-2",
    creatorId: "user-2",
    creatorName: "سارة المهندسة",
    title: "تعلم البرمجة من الصفر — حلقة 12 💻",
    categoryId: "technology",
    categoryName: "تكنولوجيا",
    thumbnailUrl: "https://picsum.photos/seed/stream2/640/360",
    status: "live",
    viewerCount: 1523,
    startedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "stream-3",
    creatorId: "user-3",
    creatorName: "محمد الطباخ",
    title: "وصفة كبسة لحم على أصولها 🍖",
    categoryId: "cooking",
    categoryName: "طبخ",
    thumbnailUrl: "https://picsum.photos/seed/stream3/640/360",
    status: "live",
    viewerCount: 892,
    startedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "stream-4",
    creatorId: "user-4",
    creatorName: "نور العلم",
    title: "مراجعة دروس الرياضيات 📚",
    categoryId: "education",
    categoryName: "تعليم",
    thumbnailUrl: "https://picsum.photos/seed/stream4/640/360",
    status: "live",
    viewerCount: 3201,
    startedAt: new Date(Date.now() - 5400000).toISOString(),
  },
  {
    id: "stream-5",
    creatorId: "user-5",
    creatorName: "كابتن فهد",
    title: "تمارين منزلية للياقة البدنية 💪",
    categoryId: "fitness",
    categoryName: "لياقة بدنية",
    thumbnailUrl: "https://picsum.photos/seed/stream5/640/360",
    status: "live",
    viewerCount: 678,
    startedAt: new Date(Date.now() - 2700000).toISOString(),
  },
];

// GET /api/streams
router.get("/", (_req, res) => {
  res.json({ success: true, streams });
});

// GET /api/streams/:id
router.get("/:id", (req, res) => {
  const stream = streams.find((s) => s.id === req.params.id);
  if (!stream)
    return res.status(404).json({ success: false, error: "البث غير موجود" });
  res.json({ success: true, stream });
});

// POST /api/streams (create stream — auth required, creator only)
router.post("/", authenticate, (req: AuthRequest, res) => {
  const { title, categoryId, categoryName } = req.body;
  const stream = {
    id: uuid(),
    creatorId: req.userId!,
    creatorName: "منشئ",
    title,
    categoryId,
    categoryName,
    thumbnailUrl: "",
    status: "live" as const,
    viewerCount: 0,
    startedAt: new Date().toISOString(),
  };
  streams.push(stream);
  res.status(201).json({ success: true, stream });
});

// POST /api/streams/:id/end
router.post("/:id/end", authenticate, (req: AuthRequest, res) => {
  const stream = streams.find((s) => s.id === req.params.id);
  if (!stream)
    return res.status(404).json({ success: false, error: "البث غير موجود" });
  stream.status = "ended" as any;
  res.json({ success: true, message: "تم إنهاء البث" });
});

export { router as streamsRouter };
