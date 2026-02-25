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
import { Ionicons } from "@expo/vector-icons";

export default function CameraPreviewScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cameraArea}>
        <Ionicons
          name="camera-outline"
          size={80}
          color={COLORS.textMuted}
          style={styles.cameraPlaceholder}
        />
        <Text style={styles.cameraText}>معاينة الكاميرا</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons
            name="camera-reverse-outline"
            size={28}
            color={COLORS.textPrimary}
          />
          <Text style={styles.controlLabel}>عكس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons name="mic-outline" size={28} color={COLORS.textPrimary} />
          <Text style={styles.controlLabel}>الصوت</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons
            name="color-wand-outline"
            size={28}
            color={COLORS.textPrimary}
          />
          <Text style={styles.controlLabel}>فلاتر</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.goLiveBtn}
          onPress={() => router.push("/host-room")}
        >
          <Ionicons name="radio" size={20} color={COLORS.white} />
          <Text style={styles.goLiveText}>ابدأ البث</Text>
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
  cameraPlaceholder: { marginBottom: -SPACING.sm },
  cameraText: { color: COLORS.textMuted, fontSize: FONT_SIZES.lg },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING["3xl"],
    paddingVertical: SPACING.xl,
  },
  controlBtn: { alignItems: "center", gap: SPACING.xs },
  controlLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  actions: {
    padding: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: SPACING["3xl"],
  },
  goLiveBtn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLORS.live,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    gap: SPACING.sm,
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
