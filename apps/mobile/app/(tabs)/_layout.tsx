import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../../src/theme";

function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: string;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="الرئيسية" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="following"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="❤️" label="المتابعين" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🔍" label="بحث" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" label="حسابي" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.bgSecondary,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: { alignItems: "center", gap: 2 },
  tabIcon: { fontSize: 22 },
  tabIconActive: { fontSize: 24 },
  tabLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textMuted },
  tabLabelActive: { color: COLORS.primaryLight, fontWeight: "600" },
});
