import { Router } from "express";
import { authenticate, type AuthRequest } from "../../middleware/auth.js";
import { users } from "../auth/auth.routes.js";

const router = Router();

function paramId(req: { params: Record<string, string | string[]> }): string {
  const val = req.params.id;
  return Array.isArray(val) ? val[0] : val;
}

// GET /api/users/me
router.get("/me", authenticate, (req: AuthRequest, res) => {
  const user = users.get(req.userId!);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: "المستخدم غير موجود" });
  }
  const { passwordHash: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  const user = users.get(paramId(req));
  if (!user)
    return res
      .status(404)
      .json({ success: false, error: "المستخدم غير موجود" });
  const { passwordHash: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// PUT /api/users/:id (auth required + self only)
router.put("/:id", authenticate, (req: AuthRequest, res) => {
  const id = paramId(req);
  if (req.userId !== id)
    return res.status(403).json({ success: false, error: "غير مصرح" });
  const user = users.get(id);
  if (!user)
    return res
      .status(404)
      .json({ success: false, error: "المستخدم غير موجود" });

  const { displayName, bio, avatarUrl } = req.body;
  if (displayName) user.displayName = displayName;
  if (bio) user.bio = bio;
  if (avatarUrl) user.avatarUrl = avatarUrl;

  const { passwordHash: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// POST /api/users/:id/follow
router.post("/:id/follow", authenticate, (req: AuthRequest, res) => {
  const target = users.get(paramId(req));
  if (!target)
    return res
      .status(404)
      .json({ success: false, error: "المستخدم غير موجود" });
  target.followerCount++;
  res.json({ success: true, message: "تمت المتابعة" });
});

// POST /api/users/:id/unfollow
router.post("/:id/unfollow", authenticate, (req: AuthRequest, res) => {
  const target = users.get(paramId(req));
  if (!target)
    return res
      .status(404)
      .json({ success: false, error: "المستخدم غير موجود" });
  target.followerCount = Math.max(0, target.followerCount - 1);
  res.json({ success: true, message: "تم إلغاء المتابعة" });
});

export { router as usersRouter };
