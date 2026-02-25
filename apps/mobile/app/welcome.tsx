import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../src/theme";
import { t } from "../src/i18n";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>📡</Text>
        </View>
        <Text style={styles.brand}>حبيبي ستريم</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{t("auth.welcomeTitle")}</Text>
        <Text style={styles.subtitle}>{t("auth.welcomeSubtitle")}</Text>

        <View style={styles.features}>
          {[
            { icon: "🎮", text: "بث مباشر للألعاب والرياضة" },
            { icon: "📚", text: "محتوى تعليمي وثقافي" },
            { icon: "🎁", text: "هدايا وعملات افتراضية" },
            { icon: "🕌", text: "محتوى حلال وآمن للعائلة" },
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.primaryBtnText}>{t("auth.getStarted")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.secondaryBtnText}>{t("nav.login")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    padding: SPACING["2xl"],
  },
  topSection: {
    alignItems: "center",
    paddingTop: SPACING["5xl"],
    gap: SPACING.md,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.glow,
  },
  iconText: { fontSize: 36 },
  brand: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "800",
    color: COLORS.primaryLight,
  },
  content: { flex: 1, justifyContent: "center", gap: SPACING.xl },
  title: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  features: { gap: SPACING.lg, paddingTop: SPACING.xl },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  featureIcon: { fontSize: 28 },
  featureText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    flex: 1,
    textAlign: "right",
  },
  actions: { gap: SPACING.md, paddingBottom: SPACING.xl },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    ...SHADOWS.glow,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
  },
});
