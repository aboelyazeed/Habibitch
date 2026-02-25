import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../../src/theme";
import { t } from "../../src/i18n";
import {
  useStreamStore,
  MOCK_STREAMS,
  MOCK_CHAT_MESSAGES,
} from "../../src/store";

type ChatMsg = {
  id: string;
  userId: string;
  displayName: string;
  content: string;
  isSubscriber: boolean;
  isCreator: boolean;
};

export default function LiveScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectStream, selectedStream } = useStreamStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    selectStream(id || "stream-1");
  }, [id]);

  const stream = selectedStream || MOCK_STREAMS[0];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev: ChatMsg[]) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        userId: "current-user",
        displayName: "مشاهد حبيبي",
        content: message,
        isSubscriber: false,
        isCreator: false,
      },
    ]);
    setMessage("");
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Video Player Area */}
      <View style={styles.playerArea}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.playerPlaceholder}>
          <Ionicons
            name="tv-outline"
            size={48}
            color={COLORS.textMuted}
            style={styles.playerIcon}
          />
          <Text style={styles.playerText}>بث مباشر</Text>
        </View>
      </View>

      {/* Stream Info */}
      <View style={styles.streamInfo}>
        <View style={styles.infoRow}>
          <View style={styles.liveDot} />
          <Text style={styles.streamTitle} numberOfLines={1}>
            {stream.title}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.creatorName}>{stream.creatorName}</Text>
          <View style={styles.viewersRow}>
            <Ionicons name="eye-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.viewers}>
              {stream.viewerCount.toLocaleString("ar-EG")}
            </Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons
              name="heart-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text style={styles.actionText}>{t("stream.follow")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnPrimary}>
            <Ionicons name="gift-outline" size={16} color={COLORS.white} />
            <Text style={styles.actionTextPrimary}>{t("stream.gift")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons
              name="star-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text style={styles.actionText}>{t("stream.subscribe")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        renderItem={({ item }) => (
          <View style={styles.chatMessage}>
            <Text
              style={[
                styles.chatName,
                item.isCreator && styles.chatNameCreator,
              ]}
            >
              {item.displayName}
            </Text>
            <Text style={styles.chatContent}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContent2}
      />

      {/* Chat Input */}
      <View style={styles.chatInputRow}>
        <TextInput
          style={styles.chatInput}
          value={message}
          onChangeText={setMessage}
          placeholder={t("stream.sendMessage")}
          placeholderTextColor={COLORS.textMuted}
          textAlign="right"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Ionicons
            name="send"
            size={16}
            color={COLORS.white}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  playerArea: {
    height: 240,
    backgroundColor: COLORS.bgSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    top: SPACING["5xl"],
    right: SPACING.lg,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  playerPlaceholder: { alignItems: "center", gap: SPACING.sm },
  playerIcon: { fontSize: 48 },
  playerText: { color: COLORS.textMuted, fontSize: FONT_SIZES.sm },
  streamInfo: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    justifyContent: "flex-end",
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.live,
  },
  streamTitle: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  creatorName: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  viewersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewers: { fontSize: FONT_SIZES.sm, color: COLORS.textMuted },
  actionRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    justifyContent: "center",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  actionText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  actionTextPrimary: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: "600",
  },
  chatList: { flex: 1 },
  chatContent2: { padding: SPACING.md, gap: SPACING.xs },
  chatMessage: {
    flexDirection: "row",
    gap: SPACING.xs,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  chatName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.primaryLight,
  },
  chatNameCreator: { color: COLORS.accentGold },
  chatContent: { fontSize: FONT_SIZES.sm, color: COLORS.textPrimary },
  chatInputRow: {
    flexDirection: "row",
    padding: SPACING.md,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
  sendIcon: { marginLeft: -2 },
});
