import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../src/theme";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../src/i18n";

export default function VerifyEmailScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleVerify = () => {
    router.replace("/create-profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name="mail-unread-outline"
          size={64}
          color={COLORS.primaryLight}
          style={styles.emoji}
        />
        <Text style={styles.title}>{t("auth.verifyEmail")}</Text>
        <Text style={styles.subtitle}>{t("auth.verifyEmailDesc")}</Text>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
              style={[styles.codeInput, digit ? styles.codeInputFilled : null]}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleVerify}>
          <Text style={styles.primaryBtnText}>{t("auth.verify")}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.resendText}>{t("auth.resendCode")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    justifyContent: "center",
    padding: SPACING["2xl"],
  },
  content: { alignItems: "center", gap: SPACING.xl },
  emoji: { marginBottom: -SPACING.md },
  title: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  codeRow: { flexDirection: "row", gap: SPACING.sm, direction: "ltr" },
  codeInput: {
    width: 48,
    height: 56,
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  codeInputFilled: { borderColor: COLORS.primary },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING["5xl"],
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    ...SHADOWS.glow,
    width: "100%",
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
  resendText: { color: COLORS.primaryLight, fontSize: FONT_SIZES.sm },
});
