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
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  useDirection?: boolean;
};

export type TextProps = ThemeProps &
  DefaultText["props"] & {
    variant?: "title" | "heading" | "subheading" | "text";
    size?: number;
  };
export type ViewProps = ThemeProps & DefaultView["props"] & { row?: boolean };

export function useThemeColor(colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  let theme = useColorScheme() ?? "light";
  theme = "light";
  return Colors[theme][colorName];
}

type textAlignment = "right" | "left" | "auto" | "center";
export const Text = React.memo((props: TextProps) => {
  const dir = useDirection();
  const colorName = props.colorName ?? "text";
  const color = useThemeColor(colorName);
  const textAlign: textAlignment = dir === "rtl" ? "right" : "left";
  // create variant for text size and font weight and color
  // title, heading, subheading, text,muted,
  // create text style prop
  const style: DefaultText["props"]["style"] = { color, textAlign, fontFamily: "Inter" };
  switch (props.variant) {
    case "title":
      style.fontSize = 32;
      style.fontWeight = "bold";
      break;
    case "heading":
      style.fontSize = 24;
      style.fontWeight = "semibold";
      break;
    case "subheading":
      style.fontSize = 18;
      style.fontWeight = "medium";
      break;
    case "text":
    default:
      style.fontSize = 16;
      style.fontWeight = "regular";
      break;
  }
  if (props.size) {
    style.fontSize = props.size;
  }
  return <DefaultText style={[style, props.style]}>{props.children}</DefaultText>;
});

export const View = React.memo((props: ViewProps) => {
  const dir = useDirection();
  const colorName = props.colorName ?? "background";
  const backgroundColor = useThemeColor(colorName);
  const flexDirection = props.row ? (dir === "rtl" ? "row-reverse" : "row") : "column";
  return <DefaultView style={[{ backgroundColor }, { flexDirection }, props.style]}>{props.children}</DefaultView>;
});
