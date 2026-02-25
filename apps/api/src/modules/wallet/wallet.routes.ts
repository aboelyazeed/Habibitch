import { Router } from "express";
import { authenticate, type AuthRequest } from "../../middleware/auth.js";

const router = Router();

const wallets = new Map<
  string,
  {
    balance: number;
    transactions: {
      id: string;
      type: string;
      amount: number;
      description: string;
      date: string;
    }[];
  }
>();

function getWallet(userId: string) {
  if (!wallets.has(userId))
    wallets.set(userId, { balance: 1250, transactions: [] });
  return wallets.get(userId)!;
}

// GET /api/wallet/my-balance
router.get("/my-balance", authenticate, (req: AuthRequest, res) => {
  const wallet = getWallet(req.userId!);
  res.json({
    success: true,
    balance: wallet.balance,
    transactions: wallet.transactions,
  });
});

// POST /api/wallet/topup
router.post("/topup", authenticate, (req: AuthRequest, res) => {
  const { amount, packageId } = req.body;
  const wallet = getWallet(req.userId!);
  wallet.balance += amount;
  wallet.transactions.unshift({
    id: `tx-${Date.now()}`,
    type: "topup",
    amount,
    description: `شحن ${amount} عملة`,
    date: new Date().toISOString(),
  });
  res.json({ success: true, balance: wallet.balance });
});

// POST /api/wallet/deduct
router.post("/deduct", authenticate, (req: AuthRequest, res) => {
  const { amount, description } = req.body;
  const wallet = getWallet(req.userId!);
  if (wallet.balance < amount)
    return res.status(400).json({ success: false, error: "رصيد غير كافي" });
  wallet.balance -= amount;
  wallet.transactions.unshift({
    id: `tx-${Date.now()}`,
    type: "deduction",
    amount: -amount,
    description,
    date: new Date().toISOString(),
  });
  res.json({ success: true, balance: wallet.balance });
});

export { router as walletRouter };
