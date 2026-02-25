import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../src/theme";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../src/i18n";
import { MOCK_STREAMS, type MockStream } from "../../src/store";

export default function CreatorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const stream =
    MOCK_STREAMS.find((s: MockStream) => s.creatorId === id) || MOCK_STREAMS[0];
  const creatorStreams = MOCK_STREAMS.filter(
    (s: MockStream) => s.creatorId === stream.creatorId,
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <Image
          source={{ uri: stream.creatorAvatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{stream.creatorName}</Text>
        {stream.isCreatorVerified && (
          <View style={styles.verifiedRow}>
            <Ionicons
              name="checkmark-circle"
              size={14}
              color={COLORS.primary}
            />
            <Text style={styles.verified}>موثق</Text>
          </View>
        )}
        <Text style={styles.category}>{stream.categoryName}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>12.5K</Text>
            <Text style={styles.statLbl}>{t("profile.followers")}</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>89</Text>
            <Text style={styles.statLbl}>{t("profile.streams")}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followText}>{t("stream.follow")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subBtn}>
            <Text style={styles.subText}>{t("stream.subscribe")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.giftBtn}>
            <Ionicons
              name="gift-outline"
              size={20}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("profile.about")}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Text style={styles.bio}>
            منشئ محتوى عربي متخصص في {stream.categoryName}. أبث مباشرة يومياً من
            الساعة 8 مساءً{" "}
          </Text>
          <Ionicons
            name="heart"
            size={14}
            color={COLORS.primary}
            style={{ marginLeft: 4 }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("profile.streams")}</Text>
        {creatorStreams.map((s: MockStream) => (
          <TouchableOpacity
            key={s.id}
            style={styles.streamCard}
            onPress={() => router.push(`/live/${s.id}`)}
          >
            <Image
              source={{ uri: s.thumbnailUrl }}
              style={styles.streamThumb}
            />
            <View style={styles.streamInfo}>
              <Text style={styles.streamTitle} numberOfLines={1}>
                {s.title}
              </Text>
              <View style={styles.viewersRow}>
                <Ionicons
                  name="eye-outline"
                  size={12}
                  color={COLORS.textMuted}
                />
                <Text style={styles.streamViewers}>
                  {s.viewerCount.toLocaleString("ar-EG")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgPrimary },
  scroll: { paddingBottom: SPACING["3xl"] },
  backBtn: {
    position: "absolute",
    top: SPACING["5xl"],
    right: SPACING.lg,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
    paddingTop: SPACING["6xl"],
    paddingBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  verifiedRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  verified: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: "600",
  },
  category: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xl,
    marginTop: SPACING.md,
  },
  stat: { alignItems: "center" },
  statVal: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  statLbl: { fontSize: FONT_SIZES.xs, color: COLORS.textMuted },
  statDiv: { width: 1, height: 32, backgroundColor: COLORS.border },
  actionsRow: { flexDirection: "row", gap: SPACING.md, marginTop: SPACING.lg },
  followBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
    ...SHADOWS.glow,
  },
  followText: { color: COLORS.white, fontWeight: "600" },
  subBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.accentGold,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
  },
  subText: { color: COLORS.accentGold, fontWeight: "600" },
  giftBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  bio: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
    textAlign: "right",
  },
  streamCard: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  streamThumb: { width: 120, height: 80, backgroundColor: COLORS.bgSecondary },
  streamInfo: { flex: 1, paddingVertical: SPACING.sm, gap: 4 },
  streamTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  viewersRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  streamViewers: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,

    textAlign: "right",
  },
});
