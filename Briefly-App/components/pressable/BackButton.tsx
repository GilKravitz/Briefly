import React from "react";
import { StyleSheet, Pressable, PressableProps, StyleProp, ViewStyle, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemeColor, ThemeProps } from "../Themed";
import AnimatedPressable from "./AnimatedPressable";
import Colors from "@/core/constants/Colors";
// export type ButtonProps = PressableProps & { light?: boolean };

interface iProps extends PressableProps, ThemeProps {
  // muted?: boolean;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  onPress: () => void;
}

export default function BackButton(props: iProps) {
  const { onPress, style, ...otherProps } = props;
  const colorName = props.colorName ?? "primary";
  const color = useThemeColor(colorName);
  return (
    <View style={styles.container}>
      <AnimatedPressable
        containerStyle={{ width: 55, height: 55 }}
        style={[styles.button, { borderColor: color }]}
        onPress={onPress}
        {...otherProps}
      >
        <Feather name="arrow-left" size={24} color={color} />
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
