import React from "react";
import { Stack, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/components/Themed";

const TabsLayout = () => {
  const activeColor = useThemeColor({}, "primary");
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      /> */}
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
