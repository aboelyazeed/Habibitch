import { I18nManager } from "react-native";

const ar = {
  app: { name: "حبيبي ستريم" },
  auth: {
    loginTitle: "تسجيل الدخول",
    signupTitle: "إنشاء حساب",
    welcomeTitle: "مرحباً بك في حبيبي ستريم",
    welcomeSubtitle: "منصة البث المباشر الأولى للمحتوى الحلال",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    displayName: "اسم العرض",
    loginBtn: "دخول",
    signupBtn: "إنشاء حساب",
    forgotPassword: "نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟",
    hasAccount: "لديك حساب؟",
    createAccount: "إنشاء حساب",
    orContinueWith: "أو المتابعة عبر",
    verifyEmail: "تحقق من بريدك",
    verifyEmailDesc: "أرسلنا رمز التحقق إلى بريدك الإلكتروني",
    enterCode: "أدخل رمز التحقق",
    verify: "تحقق",
    resendCode: "إعادة إرسال الرمز",
    getStarted: "ابدأ الآن",
    createProfileTitle: "أنشئ ملفك الشخصي",
    uploadAvatar: "رفع صورة",
    bio: "نبذة عنك",
    continue: "متابعة",
    skip: "تخطي",
  },
  nav: {
    home: "الرئيسية",
    following: "المتابعين",
    search: "بحث",
    profile: "حسابي",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "خروج",
  },
  home: {
    forYou: "لك",
    trending: "الرائج",
    liveNow: "مباشر الآن",
    recommended: "موصى به",
  },
  search: {
    placeholder: "ابحث عن منشئ محتوى أو بثوث...",
    results: "نتائج البحث",
    noResults: "لا توجد نتائج",
  },
  categories: {
    title: "التصنيفات",
    streams: "بث",
  },
  stream: {
    viewers: "مشاهد",
    startedAgo: "بدأ منذ",
    live: "مباشر",
    chat: "الدردشة",
    sendMessage: "اكتب رسالة...",
    send: "إرسال",
    follow: "متابعة",
    unfollow: "إلغاء المتابعة",
    subscribe: "اشتراك",
    gift: "هدية",
    share: "مشاركة",
    report: "إبلاغ",
  },
  profile: {
    followers: "متابع",
    following: "يتابع",
    editProfile: "تعديل الملف",
    streams: "البثوث",
    about: "حول",
    noStreams: "لا توجد بثوث بعد",
  },
  wallet: {
    title: "المحفظة",
    balance: "الرصيد",
    coins: "عملات",
    topUp: "شحن الرصيد",
    history: "السجل",
    purchase: "شراء",
    popular: "الأكثر شعبية",
    bonus: "مكافأة",
  },
  settings: {
    title: "الإعدادات",
    account: "الحساب",
    notifications: "الإشعارات",
    language: "اللغة",
    theme: "المظهر",
    privacy: "الخصوصية",
    blocked: "المحظورين",
    help: "المساعدة",
    about: "حول التطبيق",
    logout: "تسجيل الخروج",
    deleteAccount: "حذف الحساب",
  },
  report: {
    title: "إبلاغ",
    reason: "سبب الإبلاغ",
    description: "وصف المشكلة",
    submit: "إرسال",
    reasons: {
      spam: "محتوى مزعج",
      harassment: "تحرش أو تنمر",
      inappropriate: "محتوى غير لائق",
      violence: "عنف أو تهديد",
      other: "سبب آخر",
    },
  },
  creator: {
    goLive: "بدء البث",
    streamTitle: "عنوان البث",
    selectCategory: "اختر التصنيف",
    startStream: "ابدأ البث المباشر",
    endStream: "إنهاء البث",
    viewers: "المشاهدون",
    duration: "المدة",
    moderate: "إدارة الدردشة",
    timeout: "إيقاف مؤقت",
    ban: "حظر",
    deleteMsg: "حذف الرسالة",
  },
  notifications: {
    title: "الإشعارات",
    empty: "لا توجد إشعارات",
    followedYou: "بدأ بمتابعتك",
    wentLive: "بدأ بثاً مباشراً",
    sentGift: "أرسل لك هدية",
    subscribed: "اشترك في قناتك",
  },
  common: {
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    retry: "إعادة المحاولة",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    confirm: "تأكيد",
    back: "رجوع",
    done: "تم",
    seeAll: "عرض الكل",
  },
};

export type TranslationKeys = typeof ar;

let currentLang: "ar" | "en" = "ar";
const translations: Record<string, TranslationKeys> = { ar, en: ar };

export function t(path: string): string {
  const keys = path.split(".");
  let result: unknown = translations[currentLang];
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof result === "string" ? result : path;
}

export function setLanguage(lang: "ar" | "en") {
  currentLang = lang;
  I18nManager.forceRTL(lang === "ar");
}

export function getLanguage() {
  return currentLang;
}
