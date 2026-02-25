import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../src/theme";
import { t } from "../../src/i18n";
import { useStreamStore } from "../../src/store";

function StreamCard({ stream }: { stream: any }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/live/${stream.id}`)}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: stream.thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.liveBadge}>
          <Text style={styles.liveBadgeText}>{t("stream.live")}</Text>
        </View>
        <View style={styles.viewerBadge}>
          <Text style={styles.viewerText}>
            👁 {stream.viewerCount.toLocaleString("ar-EG")}
          </Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Image
          source={{ uri: stream.creatorAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {stream.title}
          </Text>
          <View style={styles.creatorRow}>
            <Text style={styles.creatorName}>{stream.creatorName}</Text>
            {stream.isCreatorVerified && (
              <Text style={styles.verifiedBadge}>✓</Text>
            )}
          </View>
          <Text style={styles.categoryText}>{stream.categoryName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { streams, isLoading, fetchStreams } = useStreamStore();
  const router = useRouter();

  useEffect(() => {
    fetchStreams();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>حبيبي ستريم</Text>
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}>
          <Text style={styles.tabTextActive}>{t("home.forYou")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>{t("home.trending")}</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={streams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StreamCard stream={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerTitle: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "800",
    color: COLORS.primaryLight,
  },
  bellIcon: { fontSize: 24 },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: {
    color: COLORS.textMuted,
    fontWeight: "600",
    fontSize: FONT_SIZES.sm,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: FONT_SIZES.sm,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  thumbnailContainer: { position: "relative" },
  thumbnail: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.bgSecondary,
  },
  liveBadge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.live,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  liveBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
  },
  viewerBadge: {
    position: "absolute",
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  viewerText: { color: COLORS.white, fontSize: FONT_SIZES.xs },
  cardInfo: { flexDirection: "row", padding: SPACING.md, gap: SPACING.md },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bgSecondary,
  },
  cardText: { flex: 1, gap: 2 },
  cardTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  creatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    justifyContent: "flex-end",
  },
  creatorName: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  verifiedBadge: {
    fontSize: 10,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryGlow,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    textAlign: "right",
  },
});
