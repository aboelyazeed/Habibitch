import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../src/theme";
import { t } from "../src/i18n";

export default function SettingsScreen() {
  const router = useRouter();

  const sections = [
    {
      title: t("settings.account"),
      items: [
        { icon: "person-outline", label: "الملف الشخصي", type: "nav" as const },
        {
          icon: "mail-outline",
          label: "البريد الإلكتروني",
          type: "nav" as const,
        },
        {
          icon: "lock-closed-outline",
          label: "كلمة المرور",
          type: "nav" as const,
        },
      ],
    },
    {
      title: t("settings.notifications"),
      items: [
        {
          icon: "notifications-outline",
          label: "إشعارات البث",
          type: "toggle" as const,
          value: true,
        },
        {
          icon: "chatbubble-outline",
          label: "إشعارات الرسائل",
          type: "toggle" as const,
          value: true,
        },
        {
          icon: "gift-outline",
          label: "إشعارات الهدايا",
          type: "toggle" as const,
          value: false,
        },
      ],
    },
    {
      title: t("settings.privacy"),
      items: [
        {
          icon: "ban-outline",
          label: t("settings.blocked"),
          type: "nav" as const,
          route: "/blocked-users",
        },
        {
          icon: "eye-off-outline",
          label: "إخفاء الحالة",
          type: "toggle" as const,
          value: false,
        },
      ],
    },
    {
      title: t("settings.about"),
      items: [
        {
          icon: "help-circle-outline",
          label: t("settings.help"),
          type: "nav" as const,
        },
        {
          icon: "document-text-outline",
          label: "شروط الاستخدام",
          type: "nav" as const,
        },
        {
          icon: "shield-checkmark-outline",
          label: "سياسة الخصوصية",
          type: "nav" as const,
        },
        {
          icon: "information-circle-outline",
          label: "الإصدار 0.1.0",
          type: "info" as const,
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.textPrimary}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("settings.title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.item}
              // @ts-ignore
              onPress={() =>
                item.type === "nav" &&
                "route" in item &&
                router.push(item.route)
              }
            >
              <View style={styles.itemLeft}>
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={22}
                  color={COLORS.textPrimary}
                  style={styles.itemIcon}
                />
                <Text style={styles.itemLabel}>{item.label}</Text>
              </View>
              {item.type === "toggle" ? (
                <Switch
                  value={item.value}
                  trackColor={{ true: COLORS.primary, false: COLORS.border }}
                  thumbColor={COLORS.white}
                />
              ) : item.type === "nav" ? (
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={COLORS.textMuted}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={styles.deleteText}>{t("settings.deleteAccount")}</Text>
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
    paddingBottom: SPACING.md,
  },
  backIcon: { marginRight: SPACING.sm },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  section: { marginTop: SPACING.xl },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textMuted,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    textAlign: "right",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  itemIcon: { width: 24, textAlign: "center" },
  itemLabel: { fontSize: FONT_SIZES.base, color: COLORS.textPrimary },
  deleteBtn: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING["3xl"],
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
  },
  deleteText: {
    color: COLORS.error,
    fontWeight: "600",
    fontSize: FONT_SIZES.sm,
  },
});
