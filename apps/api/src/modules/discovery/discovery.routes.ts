import { Router } from "express";
import { streams } from "../streams/streams.routes.js"; // We need to export this first

const router = Router();

// GET /api/discovery/feed
router.get("/feed", (_req, res) => {
  res.json({
    success: true,
    streams: streams,
    followedStreams: streams.slice(0, 4),
  });
});

const categories = [
  { id: "gaming", nameAr: "ألعاب", icon: "🎮", streamCount: 44 },
  { id: "education", nameAr: "تعليم", icon: "📚", streamCount: 42 },
  { id: "cooking", nameAr: "طبخ", icon: "🍳", streamCount: 5 },
  { id: "technology", nameAr: "تكنولوجيا", icon: "💻", streamCount: 21 },
  { id: "sports", nameAr: "رياضة", icon: "⚽", streamCount: 23 },
  { id: "islamic", nameAr: "محتوى إسلامي", icon: "🕌", streamCount: 48 },
  { id: "art-design", nameAr: "فن وتصميم", icon: "🎨", streamCount: 17 },
  { id: "travel", nameAr: "سفر", icon: "✈️", streamCount: 49 },
  { id: "fitness", nameAr: "لياقة بدنية", icon: "💪", streamCount: 12 },
  { id: "talk-shows", nameAr: "برامج حوارية", icon: "🎙", streamCount: 39 },
  { id: "family-kids", nameAr: "عائلة وأطفال", icon: "👨‍👩‍👧", streamCount: 23 },
  { id: "just-chatting", nameAr: "دردشة", icon: "💬", streamCount: 21 },
  { id: "business", nameAr: "أعمال", icon: "💼", streamCount: 35 },
  { id: "science", nameAr: "علوم", icon: "🔬", streamCount: 50 },
  { id: "crafts", nameAr: "حرف يدوية", icon: "🧶", streamCount: 53 },
  { id: "languages", nameAr: "لغات", icon: "🗣", streamCount: 16 },
];

// GET /api/discovery/categories
router.get("/categories", (_req, res) => {
  res.json({ success: true, categories });
});

// GET /api/discovery/trending
router.get("/trending", (_req, res) => {
  res.json({ success: true, trending: [] });
});

// GET /api/discovery/search?q=
router.get("/search", (req, res) => {
  const q = ((req.query.q as string) || "").toLowerCase();
  const results = categories.filter((c) => c.nameAr.includes(q));
  res.json({ success: true, results });
});

export { router as discoveryRouter };
