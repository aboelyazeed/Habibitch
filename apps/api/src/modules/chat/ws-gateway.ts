import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";

interface ChatMessage {
  type: "message" | "join" | "leave" | "system";
  userId?: string;
  displayName?: string;
  content: string;
  streamId: string;
  timestamp: string;
}

const rooms = new Map<string, Set<WebSocket>>();

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: "/ws/chat" });

  wss.on("connection", (ws) => {
    let currentRoom: string | null = null;

    ws.on("message", (data) => {
      try {
        const msg = JSON.parse(data.toString()) as ChatMessage;

        if (msg.type === "join") {
          currentRoom = msg.streamId;
          if (!rooms.has(currentRoom)) rooms.set(currentRoom, new Set());
          rooms.get(currentRoom)!.add(ws);

          // Notify room
          broadcast(currentRoom, {
            type: "system",
            content: `${msg.displayName || "مشاهد"} انضم للدردشة`,
            streamId: currentRoom,
            timestamp: new Date().toISOString(),
          });
          return;
        }

        if (msg.type === "message" && currentRoom) {
          broadcast(currentRoom, {
            ...msg,
            timestamp: new Date().toISOString(),
          });
        }
      } catch {
        ws.send(
          JSON.stringify({
            type: "system",
            content: "خطأ في الرسالة",
            streamId: "",
            timestamp: new Date().toISOString(),
          }),
        );
      }
    });

    ws.on("close", () => {
      if (currentRoom && rooms.has(currentRoom)) {
        rooms.get(currentRoom)!.delete(ws);
        if (rooms.get(currentRoom)!.size === 0) rooms.delete(currentRoom);
      }
    });
  });

  console.log("  💬 WebSocket chat gateway initialized");
}

function broadcast(roomId: string, message: ChatMessage) {
  const room = rooms.get(roomId);
  if (!room) return;
  const json = JSON.stringify(message);
  for (const client of room) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}
