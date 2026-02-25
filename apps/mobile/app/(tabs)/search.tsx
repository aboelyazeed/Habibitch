import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from "../../src/theme";
import { t } from "../../src/i18n";
import { MOCK_STREAMS } from "../../src/store";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query
    ? MOCK_STREAMS.filter(
        (s) =>
          s.title.includes(query) ||
          s.creatorName.includes(query) ||
          s.categoryName.includes(query),
      )
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("nav.search")}</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t("search.placeholder")}
          placeholderTextColor={COLORS.textMuted}
          value={query}
          onChangeText={setQuery}
          textAlign="right"
        />
      </View>

      {!query ? (
        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>{t("categories.title")}</Text>
          <View style={styles.categoryGrid}>
            {[
              { icon: "🎮", name: "ألعاب", slug: "gaming" },
              { icon: "📚", name: "تعليم", slug: "education" },
              { icon: "🍳", name: "طبخ", slug: "cooking" },
              { icon: "💻", name: "تكنولوجيا", slug: "technology" },
              { icon: "⚽", name: "رياضة", slug: "sports" },
              { icon: "🕌", name: "إسلامي", slug: "islamic" },
              { icon: "🎨", name: "فن", slug: "art-design" },
              { icon: "✈️", name: "سفر", slug: "travel" },
            ].map((cat) => (
              <TouchableOpacity
                key={cat.slug}
                style={styles.categoryCard}
                onPress={() => router.push(`/category/${cat.slug}`)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>{t("search.noResults")}</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultCard}
              onPress={() => router.push(`/live/${item.id}`)}
            >
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.resultThumb}
              />
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.resultCreator}>{item.creatorName}</Text>
                <Text style={styles.resultViewers}>
                  👁 {item.viewerCount.toLocaleString("ar-EG")}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING["5xl"],
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgInput,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  searchIcon: { fontSize: 18 },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.base,
  },
  categories: { padding: SPACING.lg, gap: SPACING.lg },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.md },
  categoryCard: {
    width: "22%",
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryIcon: { fontSize: 28 },
  categoryName: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
  },
  emptyIcon: { fontSize: 48, opacity: 0.5 },
  emptyText: { fontSize: FONT_SIZES.base, color: COLORS.textMuted },
  list: { paddingHorizontal: SPACING.lg, gap: SPACING.md },
  resultCard: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  resultThumb: { width: 120, height: 80, backgroundColor: COLORS.bgSecondary },
  resultInfo: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingRight: SPACING.sm,
    gap: 2,
  },
  resultTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  resultCreator: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  resultViewers: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    textAlign: "right",
  },
});
