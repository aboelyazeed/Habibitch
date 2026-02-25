import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../src/theme";
import { t } from "../src/i18n";

const BLOCKED_USERS = [
  {
    id: "b-1",
    name: "مستخدم محظور ١",
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=blocked1",
  },
  {
    id: "b-2",
    name: "مستخدم محظور ٢",
    avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=blocked2",
  },
];

export default function BlockedUsersScreen() {
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
        <Text style={styles.headerTitle}>{t("settings.blocked")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={BLOCKED_USERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
              <Text style={styles.userName}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.unblockBtn}>
              <Text style={styles.unblockText}>إلغاء الحظر</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="ban-outline"
              size={48}
              color={COLORS.textMuted}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>لا يوجد مستخدمين محظورين</Text>
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
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  userName: { fontSize: FONT_SIZES.base, color: COLORS.textPrimary },
  unblockBtn: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
  },
  unblockText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  empty: { alignItems: "center", paddingTop: SPACING["6xl"], gap: SPACING.md },
  emptyIcon: { opacity: 0.5 },
  emptyText: { fontSize: FONT_SIZES.base, color: COLORS.textMuted },
});
