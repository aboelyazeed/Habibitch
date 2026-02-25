import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../src/theme";
import { t } from "../src/i18n";
import { MOCK_CHAT_MESSAGES } from "../src/store";

export default function HostRoomScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
  const [viewerCount] = useState(247);
  const [duration] = useState("12:34");
  const router = useRouter();

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        userId: "current",
        displayName: "أنت",
        content: message,
        isSubscriber: false,
        isCreator: true,
      },
    ]);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Live View */}
      <View style={styles.liveArea}>
        <Text style={styles.livePlaceholder}>📡 بث مباشر</Text>
        <View style={styles.topBar}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>مباشر</Text>
          </View>
          <Text style={styles.stats}>
            👁 {viewerCount} • ⏱ {duration}
          </Text>
        </View>
      </View>

      {/* Chat */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        renderItem={({ item }) => (
          <View style={styles.chatMsg}>
            <Text
              style={[styles.chatName, item.isCreator && styles.chatCreator]}
            >
              {item.displayName}
            </Text>
            <Text style={styles.chatText}>{item.content}</Text>
          </View>
        )}
      />

      {/* Controls */}
      <View style={styles.chatInputRow}>
        <TextInput
          style={styles.chatInput}
          value={message}
          onChangeText={setMessage}
          placeholder="اكتب رسالة..."
          placeholderTextColor={COLORS.textMuted}
          textAlign="right"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text>📤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlBtn}>
          <Text style={styles.controlIcon}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <Text style={styles.controlIcon}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => router.push("/chat-moderation")}
        >
          <Text style={styles.controlIcon}>🛡️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.endBtn}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.endText}>{t("creator.endStream")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  liveArea: {
    height: 280,
    backgroundColor: COLORS.bgSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  livePlaceholder: { color: COLORS.textMuted, fontSize: FONT_SIZES.xl },
  topBar: {
    position: "absolute",
    top: SPACING["5xl"],
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.live,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  liveText: { color: COLORS.white, fontSize: FONT_SIZES.xs, fontWeight: "700" },
  stats: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  chatList: { flex: 1, padding: SPACING.md },
  chatMsg: {
    flexDirection: "row",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  chatName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.primaryLight,
  },
  chatCreator: { color: COLORS.accentGold },
  chatText: { fontSize: FONT_SIZES.sm, color: COLORS.textPrimary },
  chatInputRow: {
    flexDirection: "row",
    padding: SPACING.sm,
    gap: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatInput: {
    flex: 1,
    backgroundColor: COLORS.bgInput,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    color: COLORS.textPrimary,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgCard,
    justifyContent: "center",
    alignItems: "center",
  },
  controlIcon: { fontSize: 20 },
  endBtn: {
    backgroundColor: COLORS.live,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
  },
  endText: { color: COLORS.white, fontWeight: "600", fontSize: FONT_SIZES.sm },
});
