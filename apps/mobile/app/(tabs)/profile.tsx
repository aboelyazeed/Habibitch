import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../src/theme";
import { t } from "../../src/i18n";
import { useAuthStore, MOCK_CURRENT_USER } from "../../src/store";

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const profile = user || MOCK_CURRENT_USER;

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loginPrompt}>
          <Text style={styles.loginIcon}>👤</Text>
          <Text style={styles.loginTitle}>سجل دخولك لعرض ملفك</Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.primaryBtnText}>{t("nav.login")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("nav.profile")}</Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        <Text style={styles.displayName}>{profile.displayName}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.followerCount}</Text>
            <Text style={styles.statLabel}>{t("profile.followers")}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.followingCount}</Text>
            <Text style={styles.statLabel}>{t("profile.following")}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>{t("profile.editProfile")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        {[
          { icon: "💰", label: t("wallet.title"), route: "/wallet" },
          {
            icon: "🔔",
            label: t("notifications.title"),
            route: "/notifications",
          },
          { icon: "⚙️", label: t("settings.title"), route: "/settings" },
          { icon: "🚫", label: t("settings.blocked"), route: "/blocked-users" },
        ].map((item) => (
          <TouchableOpacity
            key={item.route}
            style={styles.menuItem}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Text style={styles.menuArrow}>‹</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          logout();
          router.replace("/welcome");
        }}
      >
        <Text style={styles.logoutText}>{t("settings.logout")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  scroll: { paddingBottom: SPACING["3xl"] },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING["5xl"],
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  settingsIcon: { fontSize: 24 },
  loginPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.lg,
    padding: SPACING.xl,
  },
  loginIcon: { fontSize: 48 },
  loginTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING["3xl"],
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.glow,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.base,
    fontWeight: "700",
  },
  profileCard: { alignItems: "center", padding: SPACING.xl, gap: SPACING.md },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  displayName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  bio: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xl,
    marginTop: SPACING.md,
  },
  stat: { alignItems: "center" },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textMuted },
  statDivider: { width: 1, height: 32, backgroundColor: COLORS.border },
  editBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING["3xl"],
    borderRadius: BORDER_RADIUS.xl,
    marginTop: SPACING.sm,
  },
  editBtnText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: FONT_SIZES.sm,
  },
  menuSection: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.xs,
    marginTop: SPACING.lg,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.bgCard,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  menuIcon: { fontSize: 20 },
  menuLabel: { fontSize: FONT_SIZES.base, color: COLORS.textPrimary },
  menuArrow: { fontSize: FONT_SIZES.xl, color: COLORS.textMuted },
  logoutBtn: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1.5,
    borderColor: COLORS.error,
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.error,
    fontWeight: "600",
    fontSize: FONT_SIZES.base,
  },
});
