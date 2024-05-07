import React from "react";
import { Stack } from "expo-router";

const ArticleStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ArticleList" />
      <Stack.Screen name="ArticleView" options={{ presentation: "fullScreenModal" }} />
      <Stack.Screen name="ReportArticle" options={{ presentation: "fullScreenModal" }} />
    </Stack>
  );
};

export default ArticleStack;
