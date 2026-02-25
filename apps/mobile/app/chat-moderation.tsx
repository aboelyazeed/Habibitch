import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../src/theme";
import { t } from "../src/i18n";
import { MOCK_CHAT_MESSAGES } from "../src/store";

export default function ChatModerationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.textPrimary}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("creator.moderate")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={MOCK_CHAT_MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <View style={styles.messageInfo}>
              <Text style={styles.userName}>{item.displayName}</Text>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons
                  name="pause-outline"
                  size={16}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.banBtn]}>
                <Ionicons name="ban-outline" size={16} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING["5xl"],
    paddingBottom: SPACING.md,
  },
  backIcon: { marginRight: SPACING.sm },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  list: { paddingBottom: SPACING["3xl"] },
  messageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  messageInfo: { flex: 1, gap: 2 },
  userName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.primaryLight,
    textAlign: "right",
  },
  messageText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  actions: { flexDirection: "row", gap: SPACING.sm },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  banBtn: { borderColor: COLORS.error },
});
