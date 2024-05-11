import React from "react";
import { Stack, Tabs, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/components/Themed";

const TabsLayout = () => {
  const activeColor = useThemeColor("primary");
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
        name="ArticleList"
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
