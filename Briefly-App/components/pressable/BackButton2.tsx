import React from "react";
import { StyleSheet, PressableProps, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProps } from "../Themed";
import AnimatedPressable from "./AnimatedPressable";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

type BackButtonProps = {
  style?: PressableProps["style"];
  variant?: "default" | "dark";
};

export default function BackButton(props: BackButtonProps) {
  const { style } = props;
  const handlePress = () => {
    router.back();
  };
  const iconColor = props.variant === "dark" ? Colors.lightPrimary : Colors.darkPrimary;
  const bgColor = props.variant === "dark" ? Colors.darkPrimary : Colors.lightPrimary;
  return (
    <AnimatedPressable onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <FontAwesome name="chevron-left" size={25} color={iconColor} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(255,255,255,0.1)",
    // backgroundColor: Colors.light.background,
  },
});
