import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../middleware/auth.js";
import { ApiError } from "../../middleware/error-handler.js";
import { v4 as uuid } from "uuid";

const router = Router();

// In-memory mock store
const users = new Map<
  string,
  {
    id: string;
    email: string;
    passwordHash: string;
    displayName: string;
    role: string;
    bio: string;
    avatarUrl: string;
    followerCount: number;
    followingCount: number;
    isVerified: boolean;
    createdAt: string;
  }
>();

// Seed admin user
const adminId = uuid();
users.set(adminId, {
  id: adminId,
  email: "admin@habibi.stream",
  passwordHash: bcrypt.hashSync("admin123", 10),
  displayName: "مدير المنصة",
  role: "admin",
  bio: "",
  avatarUrl: "",
  followerCount: 0,
  followingCount: 0,
  isVerified: true,
  createdAt: new Date().toISOString(),
});

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName)
      throw new ApiError("جميع الحقول مطلوبة", 400);

    const existing = Array.from(users.values()).find((u) => u.email === email);
    if (existing) throw new ApiError("البريد مسجل مسبقاً", 409);

    const id = uuid();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id,
      email,
      passwordHash,
      displayName,
      role: "user",
      bio: "",
      avatarUrl: `https://api.dicebear.com/9.x/adventurer/svg?seed=${id}`,
      followerCount: 0,
      followingCount: 0,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };
    users.set(id, user);

    const token = generateToken(id, "user");
    const { passwordHash: _, ...safeUser } = user;
    res.status(201).json({ success: true, token, user: safeUser });
  } catch (e) {
    next(e);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new ApiError("البريد وكلمة المرور مطلوبان", 400);

    const user = Array.from(users.values()).find((u) => u.email === email);
    if (!user) throw new ApiError("بيانات الدخول غير صحيحة", 401);

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new ApiError("بيانات الدخول غير صحيحة", 401);

    const token = generateToken(user.id, user.role);
    const { passwordHash: _, ...safeUser } = user;
    res.json({ success: true, token, user: safeUser });
  } catch (e) {
    next(e);
  }
});

// GET /api/auth/me
router.get("/me", async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new ApiError("غير مصرح", 401);
    res.json({
      success: true,
      user: { id: "current", displayName: "مشاهد حبيبي" },
    });
  } catch (e) {
    next(e);
  }
});

export { router as authRouter, users };
