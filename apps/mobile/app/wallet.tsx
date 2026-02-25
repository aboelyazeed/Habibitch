import React from "react";
import {
  View,
  Text,
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
import { useWalletStore } from "../src/store";
import { CURRENCY_PACKAGES } from "@habibi/shared";

export default function WalletScreen() {
  const { balance, addBalance } = useWalletStore();
  const router = useRouter();

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
        <Text style={styles.headerTitle}>{t("wallet.title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>{t("wallet.balance")}</Text>
        <View style={styles.balanceRow}>
          <Ionicons name="cash" size={32} color={COLORS.accentGold} />
          <Text style={styles.balanceAmount}>
            {balance.toLocaleString("ar-EG")}
          </Text>
        </View>
        <Text style={styles.balanceCurrency}>{t("wallet.coins")}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Ionicons
          name="add-circle-outline"
          size={20}
          color={COLORS.textPrimary}
        />
        <Text style={styles.sectionTitle}>{t("wallet.topUp")}</Text>
      </View>
      <View style={styles.packagesGrid}>
        {CURRENCY_PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[
              styles.packageCard,
              "isPopular" in pkg && pkg.isPopular && styles.packagePopular,
            ]}
            onPress={() => addBalance(pkg.amount)}
          >
            {"isPopular" in pkg && pkg.isPopular && (
              <View style={styles.popularBadge}>
                <Ionicons name="star" size={10} color={COLORS.bgPrimary} />
                <Text style={styles.popularText}>{t("wallet.popular")}</Text>
              </View>
            )}
            <View style={styles.packageAmountRow}>
              <Ionicons name="cash" size={20} color={COLORS.accentGold} />
              <Text style={styles.packageAmount}>
                {pkg.amount.toLocaleString("ar-EG")}
              </Text>
            </View>
            <Text style={styles.packageName}>{pkg.nameAr}</Text>
            {"bonus" in pkg && pkg.bonus && (
              <Text style={styles.packageBonus}>
                +{pkg.bonus} {t("wallet.bonus")}
              </Text>
            )}
            <Text style={styles.packagePrice}>${pkg.price}</Text>
            <View style={styles.buyBtn}>
              <Text style={styles.buyText}>{t("wallet.purchase")}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Ionicons name="receipt-outline" size={20} color={COLORS.textPrimary} />
        <Text style={styles.sectionTitle}>{t("wallet.history")}</Text>
      </View>
      {[
        { desc: "شراء 500 عملة", amount: +500, date: "٢٠٢٥/٠٢/٢٥" },
        { desc: "هدية ماسة لأحمد الغامدي", amount: -50, date: "٢٠٢٥/٠٢/٢٤" },
        { desc: "إكرامية لسارة المهندسة", amount: -10, date: "٢٠٢٥/٠٢/٢٣" },
      ].map((tx, i) => (
        <View key={i} style={styles.txItem}>
          <View>
            <Text style={styles.txDesc}>{tx.desc}</Text>
            <Text style={styles.txDate}>{tx.date}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.txAmount,
                tx.amount > 0 ? styles.txPositive : styles.txNegative,
              ]}
            >
              {tx.amount > 0 ? "+" : ""}
              {tx.amount.toLocaleString("ar-EG")}
            </Text>
            <Ionicons
              name="cash"
              size={14}
              color={tx.amount > 0 ? COLORS.success : COLORS.error}
            />
          </View>
        </View>
      ))}
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
  balanceCard: {
    margin: SPACING.lg,
    backgroundColor: COLORS.bgElevated,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: "center",
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.glow,
  },
  balanceLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary },
  balanceRow: { flexDirection: "row", alignItems: "center", gap: SPACING.xs },
  balanceAmount: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  balanceCurrency: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.accentGold,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  packagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  packageCard: {
    width: "47%",
    backgroundColor: COLORS.bgCard,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: "center",
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  packagePopular: { borderColor: COLORS.accentGold, ...SHADOWS.glow },
  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: COLORS.accentGold,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
    position: "absolute",
    top: -10,
  },
  popularText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.bgPrimary,
    fontWeight: "700",
  },
  packageAmountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: SPACING.sm,
  },
  packageAmount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  packageName: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
  packageBonus: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accentGold,
    fontWeight: "600",
  },
  packagePrice: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  buyText: { color: COLORS.white, fontWeight: "600", fontSize: FONT_SIZES.sm },
  txItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  txDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  txDate: { fontSize: FONT_SIZES.xs, color: COLORS.textMuted },
  txAmount: { fontSize: FONT_SIZES.sm, fontWeight: "600", marginRight: 4 },
  txPositive: { color: COLORS.success },
  txNegative: { color: COLORS.error },
});
