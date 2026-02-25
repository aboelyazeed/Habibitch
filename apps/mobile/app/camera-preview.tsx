import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../src/theme";

export default function CameraPreviewScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cameraArea}>
        <Text style={styles.cameraPlaceholder}>📷</Text>
        <Text style={styles.cameraText}>معاينة الكاميرا</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn}>
          <Text style={styles.controlIcon}>🔄</Text>
          <Text style={styles.controlLabel}>عكس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <Text style={styles.controlIcon}>🎤</Text>
          <Text style={styles.controlLabel}>الصوت</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <Text style={styles.controlIcon}>✨</Text>
          <Text style={styles.controlLabel}>فلاتر</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.goLiveBtn}
          onPress={() => router.push("/host-room")}
        >
          <Text style={styles.goLiveText}>🔴 ابدأ البث</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>إلغاء</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  cameraArea: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
  },
  cameraPlaceholder: { fontSize: 80 },
  cameraText: { color: COLORS.textMuted, fontSize: FONT_SIZES.lg },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING["3xl"],
    paddingVertical: SPACING.xl,
  },
  controlBtn: { alignItems: "center", gap: SPACING.xs },
  controlIcon: { fontSize: 28 },
  controlLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  actions: {
    padding: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: SPACING["3xl"],
  },
  goLiveBtn: {
    backgroundColor: COLORS.live,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    ...SHADOWS.md,
  },
  goLiveText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
  cancelText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.base,
    textAlign: "center",
  },
});
