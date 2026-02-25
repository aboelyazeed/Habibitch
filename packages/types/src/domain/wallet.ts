export type TransactionType =
  | "purchase"
  | "gift_sent"
  | "gift_received"
  | "tip_sent"
  | "tip_received"
  | "subscription";
export type TransactionStatus = "pending" | "completed" | "failed" | "refunded";

export interface Wallet {
  userId: string;
  balance: number;
  currency: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  referenceId?: string;
  createdAt: string;
}

export interface CurrencyPackage {
  id: string;
  name: string;
  nameAr: string;
  amount: number;
  price: number;
  priceCurrency: string;
  bonusAmount?: number;
  isPopular?: boolean;
}
