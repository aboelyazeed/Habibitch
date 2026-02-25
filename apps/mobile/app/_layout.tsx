import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nManager, View, ActivityIndicator } from "react-native";
import { setLanguage } from "../src/i18n";
import { useEffect } from "react";
import { useAuthStore } from "../src/store";

// Force RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
setLanguage("ar");

export default function RootLayout() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#09090b",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#09090b" },
          animation: "slide_from_left",
        }}
      />
    </>
  );
}
