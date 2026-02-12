import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cafe/[id]" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
