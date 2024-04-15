import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="PrivacyPolicy" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default AuthLayout;
