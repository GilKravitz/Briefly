/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/core/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useDirection } from "@/core/hooks/useDirection";
import React from "react";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  useDirection?: boolean;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"] & { row?: boolean };

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  let theme = useColorScheme() ?? "light";
  theme = "light";

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export const Text = React.memo((props: TextProps) => {
  const dir = useDirection();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = { light: lightColor, dark: darkColor };
  const colorName = props.colorName ?? "text";
  const color = useThemeColor(theme, colorName);
  const textAlign = dir === "rtl" ? "right" : "left";

  return <DefaultText style={[{ color, textAlign }, style]} {...otherProps} />;
});

export const View = React.memo((props: ViewProps) => {
  const dir = useDirection();
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = { light: lightColor, dark: darkColor };
  const colorName = props.colorName ?? "background";
  const backgroundColor = useThemeColor(theme, colorName);
  const flexDirection = props.row ? (dir === "rtl" ? "row-reverse" : "row") : "column";
  return <DefaultView style={[{ backgroundColor }, { flexDirection }, style]} {...otherProps} />;
});
