import { create } from "zustand";
import api from "../lib/api";

// Auth Store
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  isCreator: boolean;
  isVerified: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start true while checkAuth runs
  error: null,
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("habibi_token", token);
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.response?.data?.error || err.message || "Failed to login",
      });
      throw err;
    }
  },
  signup: async (email: string, password: string, displayName: string) => {
    try {
      set({ isLoading: true, error: null });
      const res = await api.post("/auth/register", {
        email,
        password,
        displayName,
      });
      const { token, user } = res.data;
      localStorage.setItem("habibi_token", token);
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.response?.data?.error || err.message || "Failed to sign up",
      });
      throw err;
    }
  },
  logout: () => {
    localStorage.removeItem("habibi_token");
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    try {
      const token = localStorage.getItem("habibi_token");
      if (!token) {
        set({ isLoading: false, isAuthenticated: false, user: null });
        return;
      }
      // A simple GET to verify the token/fetch my profile
      const res = await api.get("/users/me");
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      localStorage.removeItem("habibi_token");
      set({ isLoading: false, isAuthenticated: false, user: null });
    }
  },
}));

// Stream Store
export interface Stream {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  isCreatorVerified: boolean;
  title: string;
  categoryId: string;
  categoryName: string;
  thumbnailUrl?: string;
  status: "live" | "ended";
  viewerCount: number;
  startedAt: string;
}

interface StreamState {
  streams: Stream[];
  followedStreams: Stream[];
  selectedStream: Stream | null;
  isLoading: boolean;
  error: string | null;
  fetchStreams: () => Promise<void>;
  selectStream: (id: string) => Promise<void>;
}

export const useStreamStore = create<StreamState>((set, get) => ({
  streams: [],
  followedStreams: [],
  selectedStream: null,
  isLoading: false,
  error: null,
  fetchStreams: async () => {
    try {
      set({ isLoading: true, error: null });
      // Use the discovery feed endpoint which should return a list of active streams
      const res = await api.get("/discovery/feed");
      set({
        streams: res.data.streams || [],
        followedStreams: res.data.followedStreams || [],
        isLoading: false,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error:
          err.response?.data?.error || err.message || "Failed to fetch streams",
      });
    }
  },
  selectStream: async (id: string) => {
    try {
      // First check if it's already in the list
      const existing =
        get().streams.find((s) => s.id === id) ||
        get().followedStreams.find((s) => s.id === id);
      if (existing) {
        set({ selectedStream: existing });
      }
      // Always fetch the latest stream data from backend
      const res = await api.get(`/streams/${id}`);
      set({ selectedStream: res.data.stream });
    } catch (err) {
      console.error("Failed to fetch stream details", err);
    }
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
  isLoading: boolean;
  fetchBalance: () => Promise<void>;
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  isLoading: false,
  fetchBalance: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get("/wallet/my-balance");
      set({ balance: res.data.balance, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },
  addBalance: (amount: number) => set((s) => ({ balance: s.balance + amount })),
  deductBalance: (amount: number) => {
    if (get().balance >= amount) {
      set((s) => ({ balance: s.balance - amount }));
      return true;
    }
    return false;
  },
}));
