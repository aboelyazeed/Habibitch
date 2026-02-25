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

export default function FollowingScreen() {
  const { streams, isLoading, fetchStreams } = useStreamStore();
  const router = useRouter();
  const followedStreams = streams.slice(0, 4);

  useEffect(() => {
    fetchStreams();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("nav.following")}</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : followedStreams.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyTitle}>لا يوجد بثوث من متابعيك</Text>
          <Text style={styles.emptyDesc}>
            تابع منشئي المحتوى لرؤية بثوثهم هنا
          </Text>
        </View>
      ) : (
        <FlatList
          data={followedStreams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/live/${item.id}`)}
            >
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.thumbnail}
              />
              <View style={styles.cardOverlay}>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveText}>{t("stream.live")}</Text>
                </View>
              </View>
              <View style={styles.cardInfo}>
                <Image
                  source={{ uri: item.creatorAvatarUrl }}
                  style={styles.avatar}
                />
                <View style={styles.textGroup}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.creatorName}>{item.creatorName}</Text>
                  <Text style={styles.viewers}>
                    👁 {item.viewerCount.toLocaleString("ar-EG")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING["5xl"],
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.xl,
  },
  emptyIcon: { fontSize: 48 },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  emptyDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    textAlign: "center",
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
  thumbnail: {
    width: "100%",
    height: 180,
    backgroundColor: COLORS.bgSecondary,
  },
  cardOverlay: { position: "absolute", top: SPACING.sm, right: SPACING.sm },
  liveBadge: {
    backgroundColor: COLORS.live,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  liveText: { color: COLORS.white, fontSize: FONT_SIZES.xs, fontWeight: "700" },
  cardInfo: { flexDirection: "row", padding: SPACING.md, gap: SPACING.md },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgSecondary,
  },
  textGroup: { flex: 1, gap: 2 },
  cardTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  creatorName: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  viewers: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    textAlign: "right",
  },
});
