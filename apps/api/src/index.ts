import express from "express";
import cors from "cors";
import { createServer } from "http";
import { setupWebSocket } from "./modules/chat/ws-gateway.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { streamsRouter } from "./modules/streams/streams.routes.js";
import { discoveryRouter } from "./modules/discovery/discovery.routes.js";
import { walletRouter } from "./modules/wallet/wallet.routes.js";
import { giftingRouter } from "./modules/gifting/gifting.routes.js";
import { subscriptionsRouter } from "./modules/subscriptions/subscriptions.routes.js";
import { reportsRouter } from "./modules/reports/reports.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import { requestLogger } from "./middleware/request-logger.js";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// ── Core Middleware ──
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(requestLogger);

// ── API Routes ──
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/streams", streamsRouter);
app.use("/api/discovery", discoveryRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/gifting", giftingRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/admin", adminRouter);

// ── Health check ──
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", version: "0.1.0", uptime: process.uptime() });
});

// ── Error Handler ──
app.use(errorHandler);

// ── WebSocket for Chat ──
setupWebSocket(server);

// ── Start Server ──
server.listen(PORT, () => {
  console.log(`\n🚀 Habibi Stream API running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket chat on ws://localhost:${PORT}/ws/chat`);
  console.log(`💜 Ready for connections!\n`);
});

export default app;
