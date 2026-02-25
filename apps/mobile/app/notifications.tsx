import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../src/theme";
import { t } from "../src/i18n";
import { MOCK_NOTIFICATIONS } from "../src/store";

export default function NotificationsScreen() {
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
        <Text style={styles.headerTitle}>{t("notifications.title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.notifItem, !item.read && styles.notifUnread]}>
            <Ionicons
              name={
                item.type === "follow"
                  ? "person-circle-outline"
                  : item.type === "live"
                    ? "tv-outline"
                    : item.type === "gift"
                      ? "gift-outline"
                      : "star-outline"
              }
              size={28}
              color={COLORS.primary}
            />
            <View style={styles.notifContent}>
              <Text style={styles.notifUser}>{item.userName}</Text>
              <Text style={styles.notifMessage}>{item.message}</Text>
              <Text style={styles.notifTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="notifications-outline"
              size={48}
              color={COLORS.textMuted}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>{t("notifications.empty")}</Text>
          </View>
        }
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
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notifUnread: { backgroundColor: "rgba(168, 85, 247, 0.05)" },
  notifContent: { flex: 1, gap: 2 },
  notifUser: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  notifMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  notifTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    textAlign: "right",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
    paddingTop: SPACING["6xl"],
  },
  emptyIcon: { opacity: 0.5 },
  emptyText: { fontSize: FONT_SIZES.base, color: COLORS.textMuted },
});
