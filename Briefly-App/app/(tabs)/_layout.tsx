import React, { useEffect } from "react";
import { Redirect, Stack, Tabs, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/components/Themed";
import { useSession } from "@/core/store/sessionContext";
import { Text } from "@/components/Themed";
import API from "@/core/api";
const TabsLayout = () => {
  const session = useSession();
  const activeColor = useThemeColor("primary");

  if (session.loading) {
    API.Auth.setToken(session.token);
    console.log("token", session.token);
    return <Text>Loading...</Text>;
  }

  if (!session.token) {
    return <Redirect href="/(auth)/AppLaunch" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#f0f0f0",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Bookmarked"
        options={{
          title: "Bookmarked",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-o" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
