import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) return <Redirect href="/sign-up" />;

  return <Slot />;
}