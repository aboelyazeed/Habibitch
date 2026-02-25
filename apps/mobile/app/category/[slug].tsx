import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../src/theme";
import { t } from "../../src/i18n";
import { MOCK_STREAMS, type MockStream } from "../../src/store";

export default function CategoryResultsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const results = MOCK_STREAMS.filter((s: MockStream) => s.categoryId === slug);
  const categoryName = results[0]?.categoryName || slug;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backIcon}>→</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.count}>
        {results.length} {t("categories.streams")}
      </Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/live/${item.id}`)}
          >
            <Image source={{ uri: item.thumbnailUrl }} style={styles.thumb} />
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>{t("stream.live")}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Image
                source={{ uri: item.creatorAvatarUrl }}
                style={styles.avatar}
              />
              <View style={styles.textGroup}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.creator}>{item.creatorName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>لا يوجد بثوث في هذا التصنيف</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING["5xl"],
    paddingBottom: SPACING.md,
  },
  backIcon: { fontSize: FONT_SIZES.xl, color: COLORS.textPrimary },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  count: {
    paddingHorizontal: SPACING.lg,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    textAlign: "right",
  },
  list: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING["3xl"],
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  thumb: { width: "100%", height: 180, backgroundColor: COLORS.bgSecondary },
  liveBadge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.live,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  liveText: { color: COLORS.white, fontSize: FONT_SIZES.xs, fontWeight: "700" },
  cardInfo: { flexDirection: "row", padding: SPACING.md, gap: SPACING.md },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  textGroup: { flex: 1, gap: 2 },
  title: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  creator: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  empty: { alignItems: "center", paddingTop: SPACING["5xl"] },
  emptyText: { color: COLORS.textMuted, fontSize: FONT_SIZES.base },
});
