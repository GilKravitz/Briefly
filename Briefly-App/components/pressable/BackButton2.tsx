import React from "react";
import { StyleSheet, Pressable, PressableProps, StyleProp, ViewStyle, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useThemeColor, ThemeProps } from "../Themed";
import AnimatedPressable from "./AnimatedPressable";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

interface iProps extends PressableProps, ThemeProps {}

export default function BackButton(props: iProps) {
  const { style } = props;
  const handlePress = () => {
    router.back();
  };
  return (
    <AnimatedPressable style={styles.container} onPress={handlePress}>
      <View style={styles.inner}>
        <FontAwesome name="chevron-left" size={25} color={Colors.light.primary} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 32,
    left: 16,
  },
  inner: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
