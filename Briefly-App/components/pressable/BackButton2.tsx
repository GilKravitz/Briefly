import React from "react";
import { StyleSheet, PressableProps, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AnimatedPressable from "./AnimatedPressable";
import Colors from "@/core/constants/Colors";
import { router } from "expo-router";

type BackButtonProps = {
  style?: PressableProps["style"];
  variant?: "default" | "dark";
};

const buttonSize = 50;

export default function BackButton(props: BackButtonProps) {
  const { style } = props;
  const handlePress = () => {
    if (router.canGoBack()) router.back();
  };

  const iconColor = props.variant === "dark" ? Colors.lightPrimary : Colors.darkPrimary;
  const bgColor = props.variant === "dark" ? Colors.darkPrimary : Colors.lightPrimary;
  return (
    <View style={{ width: "100%" }}>
      <AnimatedPressable containerStyle={{ width: buttonSize, height: buttonSize }} onPress={handlePress}>
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          <FontAwesome name="chevron-left" size={25} color={iconColor} />
        </View>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(255,255,255,0.1)",
    // backgroundColor: Colors.light.background,
  },
});
