import React from "react";
import { StyleSheet, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemeColor, ThemeProps } from "../Themed";
import AnimatedPressable from "./AnimatedPressable";
import Colors from "@/constants/Colors";
// export type ButtonProps = PressableProps & { light?: boolean };

interface iProps extends PressableProps, ThemeProps {
  // muted?: boolean;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  onPress: () => void;
}

export default function BackButton(props: iProps) {
  const { onPress, style, lightColor, darkColor, ...otherProps } = props;
  const colorName = props.colorName ?? "primary";
  const theme = { light: lightColor, dark: darkColor };
  const color = useThemeColor(theme, colorName);
  return (
    <AnimatedPressable
      containerStyle={{ width: 55, height: 55 }}
      style={[styles.button, { borderColor: color }]}
      onPress={onPress}
      {...otherProps}
    >
      <Feather name="arrow-left" size={24} color={color} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
