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

export default function GoLiveScreen() {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const categories = [
    { id: "gaming", name: "ألعاب", icon: "game-controller-outline" },
    { id: "education", name: "تعليم", icon: "book-outline" },
    { id: "cooking", name: "طبخ", icon: "restaurant-outline" },
    { id: "technology", name: "تكنولوجيا", icon: "laptop-outline" },
    { id: "islamic", name: "إسلامي", icon: "moon-outline" },
    { id: "just-chatting", name: "دردشة", icon: "chatbubble-ellipses-outline" },
    { id: "art-design", name: "فن", icon: "color-palette-outline" },
    { id: "fitness", name: "لياقة", icon: "barbell-outline" },
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
        <Text style={styles.headerTitle}>{t("creator.goLive")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("creator.streamTitle")}</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="عنوان البث المباشر..."
            placeholderTextColor={COLORS.textMuted}
            textAlign="right"
          />
        </View>

        <Text style={styles.label}>{t("creator.selectCategory")}</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                selectedCategory === cat.id && styles.categoryActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons
                name={cat.icon as keyof typeof Ionicons.glyphMap}
                size={28}
                color={
                  selectedCategory === cat.id
                    ? COLORS.primaryLight
                    : COLORS.textMuted
                }
              />
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === cat.id && styles.categoryNameActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.goLiveBtn}
        onPress={() => router.push("/camera-preview")}
      >
        <Ionicons name="radio" size={24} color={COLORS.white} />
        <Text style={styles.goLiveText}>{t("creator.startStream")}</Text>
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
  form: { padding: SPACING.lg, gap: SPACING.lg },
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
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  categoryCard: {
    width: "22%",
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    gap: SPACING.xs,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  categoryActive: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(168, 85, 247, 0.1)",
  },
  categoryName: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  categoryNameActive: { color: COLORS.primaryLight },
  goLiveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    backgroundColor: COLORS.live,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.md,
  },
  goLiveText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
});
