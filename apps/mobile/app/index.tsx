import { Redirect } from "expo-router";
import { useAuthStore } from "../src/store";

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/splash"} />;
}
