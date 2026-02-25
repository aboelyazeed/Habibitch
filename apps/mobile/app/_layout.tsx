import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nManager } from "react-native";
import { setLanguage } from "../src/i18n";

// Force RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
setLanguage("ar");

export default function RootLayout() {
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
