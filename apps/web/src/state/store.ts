import { create } from "zustand";
import { MOCK_CURRENT_USER, MOCK_STREAMS } from "../services/mock-data";

// Auth Store
interface AuthState {
  user: typeof MOCK_CURRENT_USER | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, displayName: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (_email: string, _password: string) => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ user: MOCK_CURRENT_USER, isAuthenticated: true, isLoading: false });
    }, 800);
  },
  signup: (_email: string, _password: string, _displayName: string) => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ user: MOCK_CURRENT_USER, isAuthenticated: true, isLoading: false });
    }, 800);
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

// Stream Store
interface StreamState {
  streams: typeof MOCK_STREAMS;
  followedStreams: typeof MOCK_STREAMS;
  selectedStream: (typeof MOCK_STREAMS)[0] | null;
  isLoading: boolean;
  fetchStreams: () => void;
  selectStream: (id: string) => void;
}

export const useStreamStore = create<StreamState>((set, get) => ({
  streams: [],
  followedStreams: [],
  selectedStream: null,
  isLoading: false,
  fetchStreams: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({
        streams: MOCK_STREAMS,
        followedStreams: MOCK_STREAMS.slice(0, 4),
        isLoading: false,
      });
    }, 500);
  },
  selectStream: (id: string) => {
    const stream =
      get().streams.find((s) => s.id === id) ||
      MOCK_STREAMS.find((s) => s.id === id);
    set({ selectedStream: stream || null });
  },
}));

// UI Store
interface UIState {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  activeModal: null,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  openModal: (id: string) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));

// Wallet Store
interface WalletState {
  balance: number;
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 1250,
  addBalance: (amount: number) => set((s) => ({ balance: s.balance + amount })),
  deductBalance: (amount: number) => {
    if (get().balance >= amount) {
      set((s) => ({ balance: s.balance - amount }));
      return true;
    }
    return false;
  },
}));
