import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
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

export default function ReportScreen() {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const reasons = [
    { id: "spam", label: t("report.reasons.spam"), icon: "mail-outline" },
    {
      id: "harassment",
      label: t("report.reasons.harassment"),
      icon: "warning-outline",
    },
    {
      id: "inappropriate",
      label: t("report.reasons.inappropriate"),
      icon: "alert-circle-outline",
    },
    {
      id: "violence",
      label: t("report.reasons.violence"),
      icon: "close-circle-outline",
    },
    {
      id: "other",
      label: t("report.reasons.other"),
      icon: "help-circle-outline",
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
        <Text style={styles.headerTitle}>{t("report.title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>{t("report.reason")}</Text>
      <View style={styles.reasons}>
        {reasons.map((reason) => (
          <TouchableOpacity
            key={reason.id}
            style={[
              styles.reasonCard,
              selectedReason === reason.id && styles.reasonActive,
            ]}
            onPress={() => setSelectedReason(reason.id)}
          >
            <Ionicons
              name={reason.icon as keyof typeof Ionicons.glyphMap}
              size={24}
              color={
                selectedReason === reason.id
                  ? COLORS.primaryLight
                  : COLORS.textMuted
              }
            />
            <Text
              style={[
                styles.reasonLabel,
                selectedReason === reason.id && styles.reasonLabelActive,
              ]}
            >
              {reason.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t("report.description")}</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          placeholder="اشرح المشكلة بالتفصيل..."
          placeholderTextColor={COLORS.textMuted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          textAlign="right"
        />
      </View>

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>{t("report.submit")}</Text>
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
  sectionTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    textAlign: "right",
  },
  reasons: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  reasonCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  reasonActive: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(168, 85, 247, 0.08)",
  },
  reasonLabel: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: "right",
  },
  reasonLabelActive: { color: COLORS.primaryLight },
  inputGroup: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    gap: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  textArea: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.base,
    height: 120,
  },
  submitBtn: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
  },
  submitText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
});
