import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
} from "../src/theme";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../src/i18n";

export default function CreateProfileScreen() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>{t("auth.createProfileTitle")}</Text>

      <TouchableOpacity style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons
            name="camera-outline"
            size={40}
            color={COLORS.primaryLight}
          />
        </View>
        <Text style={styles.uploadText}>{t("auth.uploadAvatar")}</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("auth.displayName")}</Text>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="اسمك المعروض"
            placeholderTextColor={COLORS.textMuted}
            textAlign="right"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("auth.bio")}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="نبذة قصيرة عنك..."
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            textAlign="right"
          />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleContinue}>
          <Text style={styles.primaryBtnText}>{t("auth.continue")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue}>
          <Text style={styles.skipText}>{t("auth.skip")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  scroll: { padding: SPACING["2xl"], paddingTop: SPACING["5xl"] },
  title: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING["3xl"],
  },
  avatarContainer: {
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING["3xl"],
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.bgCard,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    color: COLORS.primaryLight,
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
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
  textArea: { height: 100 },
  actions: { gap: SPACING.lg, marginTop: SPACING["3xl"], alignItems: "center" },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
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
  skipText: { color: COLORS.textMuted, fontSize: FONT_SIZES.sm },
});
