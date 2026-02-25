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

export default function SignupScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSignup = () => {
    signup(email, password, displayName);
    setTimeout(() => router.push("/verify-email"), 900);
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
          <Text style={styles.title}>{t("auth.signupTitle")}</Text>
          <Text style={styles.subtitle}>{t("auth.welcomeSubtitle")}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("auth.displayName")}</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: أحمد"
              placeholderTextColor={COLORS.textMuted}
              value={displayName}
              onChangeText={setDisplayName}
              textAlign="right"
            />
          </View>
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("auth.confirmPassword")}</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textAlign="left"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.primaryBtnText}>
              {isLoading ? t("common.loading") : t("auth.signupBtn")}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.footerText}>{t("auth.hasAccount")} </Text>
          <Text style={styles.footerLink}>{t("nav.login")}</Text>
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING["3xl"],
  },
  footerText: { color: COLORS.textMuted },
  footerLink: { color: COLORS.primaryLight, fontWeight: "600" },
});
