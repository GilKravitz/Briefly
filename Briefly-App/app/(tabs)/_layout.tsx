import React from "react";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/components/Themed";
import { Text } from "@/components/Themed";
import { useAuth } from "@/core/hooks/persistentHooks";
import Container from "@/components/Container";
const TabsLayout = () => {
  const activeColor = useThemeColor("primary");
  const { loading, token } = useAuth();

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!token) {
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
