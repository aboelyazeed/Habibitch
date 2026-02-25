import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import { useAuthStore } from "../src/store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    login(email, password);
    setTimeout(() => router.replace("/(tabs)/home"), 900);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>📡</Text>
          </View>
          <Text style={styles.brand}>حبيبي ستريم</Text>
          <Text style={styles.title}>{t("auth.loginTitle")}</Text>
          <Text style={styles.subtitle}>{t("auth.welcomeSubtitle")}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("auth.email")}</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="left"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("auth.password")}</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textAlign="left"
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotLink}>{t("auth.forgotPassword")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.primaryBtnText}>
              {isLoading ? t("common.loading") : t("auth.loginBtn")}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t("auth.orContinueWith")}</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.footerText}>{t("auth.noAccount")} </Text>
          <Text style={styles.footerLink}>{t("auth.createAccount")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  scroll: { flexGrow: 1, padding: SPACING["2xl"], justifyContent: "center" },
  header: {
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING["3xl"],
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.glow,
  },
  iconText: { fontSize: 28 },
  brand: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "800",
    color: COLORS.primaryLight,
  },
  title: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  form: { gap: SPACING.lg },
  inputGroup: { gap: SPACING.xs },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  input: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.base,
  },
  forgotLink: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.sm,
    textAlign: "right",
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    ...SHADOWS.glow,
    marginTop: SPACING.sm,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginVertical: SPACING.sm,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.textMuted, fontSize: FONT_SIZES.sm },
  socialRow: { flexDirection: "row", gap: SPACING.md },
  socialBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  socialText: { color: COLORS.textPrimary, fontWeight: "600" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING["3xl"],
  },
  footerText: { color: COLORS.textMuted },
  footerLink: { color: COLORS.primaryLight, fontWeight: "600" },
});
