import { t } from "../i18n";
import { useWalletStore } from "../state/store";
import { CURRENCY_PACKAGES } from "@habibi/shared";
import { Wallet as WalletIcon, Plus, History, Sparkles } from "lucide-react";
import "./Wallet.css";

export default function Wallet() {
  const { balance, addBalance } = useWalletStore();

  return (
    <div className="wallet-page">
      {/* Balance Card */}
      <div className="wallet-balance-card card-glass">
        <div className="wallet-balance-glow" />
        <div className="wallet-balance-content">
          <WalletIcon size={24} className="wallet-balance-icon" />
          <span className="wallet-balance-label">{t("wallet.balance")}</span>
          <div className="wallet-balance-amount">
            <span>{balance.toLocaleString("ar-EG")}</span>
            <span className="wallet-coin-icon">🪙</span>
          </div>
          <span className="wallet-balance-currency">{t("wallet.coins")}</span>
        </div>
      </div>

      {/* Buy Currency */}
      <section className="wallet-section">
        <div className="wallet-section-header">
          <Plus size={20} />
          <h2>{t("wallet.topUp")}</h2>
        </div>
        <div className="wallet-packages-grid">
          {CURRENCY_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              className={`wallet-package-card ${(pkg as any).isPopular ? "wallet-package-popular" : ""}`}
              onClick={() => addBalance(pkg.amount)}
            >
              {(pkg as any).isPopular && (
                <span className="wallet-popular-badge">
                  <Sparkles size={12} />
                  {t("wallet.popular")}
                </span>
              )}
              <span className="wallet-package-amount">
                {pkg.amount.toLocaleString("ar-EG")} 🪙
              </span>
              <span className="wallet-package-name">{pkg.nameAr}</span>
              {"bonus" in pkg && pkg.bonus && (
                <span className="wallet-package-bonus">
                  +{pkg.bonus} {t("wallet.bonus")}
                </span>
              )}
              <span className="wallet-package-price">${pkg.price}</span>
              <span
                className="btn btn-primary btn-sm"
                style={{ width: "100%", marginTop: "var(--space-2)" }}
              >
                {t("wallet.purchase")}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Transaction History */}
      <section className="wallet-section">
        <div className="wallet-section-header">
          <History size={20} />
          <h2>{t("wallet.history")}</h2>
        </div>
        <div className="wallet-history">
          {[
            {
              type: "purchase",
              amount: +500,
              desc: "شراء 500 عملة",
              date: "٢٠٢٥/٠٢/٢٥",
            },
            {
              type: "gift_sent",
              amount: -50,
              desc: "هدية ماسة لأحمد الغامدي",
              date: "٢٠٢٥/٠٢/٢٤",
            },
            {
              type: "tip_sent",
              amount: -10,
              desc: "إكرامية لسارة المهندسة",
              date: "٢٠٢٥/٠٢/٢٣",
            },
            {
              type: "purchase",
              amount: +1200,
              desc: "شراء 1,200 عملة + 200 مكافأة",
              date: "٢٠٢٥/٠٢/٢٠",
            },
          ].map((tx, i) => (
            <div key={i} className="wallet-tx-item">
              <div className="wallet-tx-info">
                <span className="wallet-tx-desc">{tx.desc}</span>
                <span className="wallet-tx-date">{tx.date}</span>
              </div>
              <span
                className={`wallet-tx-amount ${tx.amount > 0 ? "wallet-tx-positive" : "wallet-tx-negative"}`}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount.toLocaleString("ar-EG")} 🪙
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
