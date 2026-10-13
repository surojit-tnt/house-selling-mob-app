import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthenticatedLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{headerShown:false}} />;
}