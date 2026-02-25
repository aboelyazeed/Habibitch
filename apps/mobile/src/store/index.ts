import { create } from "zustand";

// ── Mock Data ──
export const MOCK_CURRENT_USER = {
  id: "current-user",
  email: "viewer@habibi.stream",
  displayName: "مشاهد حبيبي",
  avatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Viewer",
  bio: "محب للمحتوى العربي الهادف",
  followerCount: 12,
  followingCount: 45,
  isLive: false,
  isVerified: false,
  isCreator: false,
  walletBalance: 1250,
};

export const MOCK_STREAMS = [
  {
    id: "stream-1",
    creatorId: "user-1",
    creatorName: "أحمد الغامدي",
    creatorAvatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ahmed",
    isCreatorVerified: true,
    title: "بث مباشر: فورتنايت مع المتابعين 🎮",
    categoryId: "gaming",
    categoryName: "ألعاب",
    thumbnailUrl: "https://picsum.photos/seed/stream1/640/360",
    status: "live" as const,
    viewerCount: 2847,
    startedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "stream-2",
    creatorId: "user-2",
    creatorName: "سارة المهندسة",
    creatorAvatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara",
    isCreatorVerified: true,
    title: "تعلم البرمجة من الصفر — حلقة 12 💻",
    categoryId: "technology",
    categoryName: "تكنولوجيا",
    thumbnailUrl: "https://picsum.photos/seed/stream2/640/360",
    status: "live" as const,
    viewerCount: 1523,
    startedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "stream-3",
    creatorId: "user-3",
    creatorName: "محمد الطباخ",
    creatorAvatarUrl:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=Mohammed",
    isCreatorVerified: false,
    title: "وصفة كبسة لحم على أصولها 🍖",
    categoryId: "cooking",
    categoryName: "طبخ",
    thumbnailUrl: "https://picsum.photos/seed/stream3/640/360",
    status: "live" as const,
    viewerCount: 892,
    startedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "stream-4",
    creatorId: "user-4",
    creatorName: "نور العلم",
    creatorAvatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Noor",
    isCreatorVerified: true,
    title: "مراجعة دروس الرياضيات 📚",
    categoryId: "education",
    categoryName: "تعليم",
    thumbnailUrl: "https://picsum.photos/seed/stream4/640/360",
    status: "live" as const,
    viewerCount: 3201,
    startedAt: new Date(Date.now() - 5400000).toISOString(),
  },
  {
    id: "stream-5",
    creatorId: "user-5",
    creatorName: "كابتن فهد",
    creatorAvatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Fahd",
    isCreatorVerified: false,
    title: "تمارين منزلية للياقة البدنية 💪",
    categoryId: "fitness",
    categoryName: "لياقة بدنية",
    thumbnailUrl: "https://picsum.photos/seed/stream5/640/360",
    status: "live" as const,
    viewerCount: 678,
    startedAt: new Date(Date.now() - 2700000).toISOString(),
  },
  {
    id: "stream-6",
    creatorId: "user-6",
    creatorName: "ياسمين الفنانة",
    creatorAvatarUrl:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=Yasmine",
    isCreatorVerified: true,
    title: "رسم بورتريه مباشر 🎨",
    categoryId: "art-design",
    categoryName: "فن وتصميم",
    thumbnailUrl: "https://picsum.photos/seed/stream6/640/360",
    status: "live" as const,
    viewerCount: 1156,
    startedAt: new Date(Date.now() - 4500000).toISOString(),
  },
  {
    id: "stream-7",
    creatorId: "user-7",
    creatorName: "شيخ عبدالله",
    creatorAvatarUrl:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=Abdullah",
    isCreatorVerified: true,
    title: "تفسير سورة الكهف 🕌",
    categoryId: "islamic",
    categoryName: "محتوى إسلامي",
    thumbnailUrl: "https://picsum.photos/seed/stream7/640/360",
    status: "live" as const,
    viewerCount: 5432,
    startedAt: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    id: "stream-8",
    creatorId: "user-8",
    creatorName: "علي الرحال",
    creatorAvatarUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ali",
    isCreatorVerified: false,
    title: "جولة في أسواق إسطنبول 🇹🇷",
    categoryId: "travel",
    categoryName: "سفر",
    thumbnailUrl: "https://picsum.photos/seed/stream8/640/360",
    status: "live" as const,
    viewerCount: 1890,
    startedAt: new Date(Date.now() - 6000000).toISOString(),
  },
];

export type MockStream = (typeof MOCK_STREAMS)[number];

export const MOCK_CHAT_MESSAGES = [
  {
    id: "msg-1",
    userId: "user-20",
    displayName: "عمر",
    content: "ماشاء الله عليك! 🔥",
    isSubscriber: true,
    isCreator: false,
  },
  {
    id: "msg-2",
    userId: "user-21",
    displayName: "فاطمة",
    content: "أهلاً بالجميع ❤️",
    isSubscriber: false,
    isCreator: false,
  },
  {
    id: "msg-3",
    userId: "user-22",
    displayName: "خالد",
    content: "يا سلام على اللعب!",
    isSubscriber: true,
    isCreator: false,
  },
  {
    id: "msg-4",
    userId: "user-23",
    displayName: "مريم",
    content: "محتوى رائع 👏",
    isSubscriber: false,
    isCreator: false,
  },
  {
    id: "msg-5",
    userId: "user-1",
    displayName: "أحمد الغامدي",
    content: "أهلاً فيكم جميعاً! 💜",
    isSubscriber: false,
    isCreator: true,
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "n-1",
    type: "follow",
    userId: "user-20",
    userName: "عمر",
    message: "بدأ بمتابعتك",
    time: "منذ 5 دقائق",
    read: false,
  },
  {
    id: "n-2",
    type: "live",
    userId: "user-1",
    userName: "أحمد الغامدي",
    message: "بدأ بثاً مباشراً",
    time: "منذ 15 دقيقة",
    read: false,
  },
  {
    id: "n-3",
    type: "gift",
    userId: "user-21",
    userName: "فاطمة",
    message: "أرسلت لك هدية ماسة 💎",
    time: "منذ ساعة",
    read: true,
  },
  {
    id: "n-4",
    type: "subscribe",
    userId: "user-22",
    userName: "خالد",
    message: "اشترك في قناتك",
    time: "منذ ساعتين",
    read: true,
  },
];

// ── Auth Store ──
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
    setTimeout(
      () =>
        set({
          user: MOCK_CURRENT_USER,
          isAuthenticated: true,
          isLoading: false,
        }),
      800,
    );
  },
  signup: (_email: string, _password: string, _displayName: string) => {
    set({ isLoading: true });
    setTimeout(
      () =>
        set({
          user: MOCK_CURRENT_USER,
          isAuthenticated: true,
          isLoading: false,
        }),
      800,
    );
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// ── Stream Store ──
interface StreamState {
  streams: typeof MOCK_STREAMS;
  selectedStream: (typeof MOCK_STREAMS)[0] | null;
  isLoading: boolean;
  fetchStreams: () => void;
  selectStream: (id: string) => void;
}

export const useStreamStore = create<StreamState>((set, get) => ({
  streams: [],
  selectedStream: null,
  isLoading: false,
  fetchStreams: () => {
    set({ isLoading: true });
    setTimeout(() => set({ streams: MOCK_STREAMS, isLoading: false }), 500);
  },
  selectStream: (id: string) => {
    const stream =
      get().streams.find((s) => s.id === id) ||
      MOCK_STREAMS.find((s) => s.id === id);
    set({ selectedStream: stream || null });
  },
}));

// ── Wallet Store ──
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
