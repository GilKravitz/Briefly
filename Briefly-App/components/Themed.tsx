/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/core/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useDirection } from "@/core/hooks/useDirection";
import React from "react";
import { useFontSize } from "@/core/store/fontSizeContext";

export type ThemeProps = {
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  useDirection?: boolean;
};

export type TextProps = ThemeProps &
  DefaultText["props"] & {
    variant?: "title" | "heading" | "subheading" | "text";
    size?: number;
    weight?: "regular" | "medium" | "semibold" | "bold";
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
  const { fontSize } = useFontSize();
  // create variant for text size and font weight and color
  // title, heading, subheading, text,muted,
  // create text style prop
  const style: DefaultText["props"]["style"] = { color, textAlign, fontFamily: "Inter_400Regular" };
  switch (props.variant) {
    case "title":
      style.fontSize = fontSize * 2;
      style.fontWeight = "bold";
      style.fontFamily = "Inter_700Bold";
      break;
    case "heading":
      style.fontSize = fontSize * 1.5;
      style.fontWeight = "semibold";
      style.fontFamily = "Inter_600SemiBold";
      break;
    case "subheading":
      style.fontSize = fontSize * 1.125;
      style.fontWeight = "medium";
      style.fontFamily = "Inter_500Medium";
      break;
    case "text":
    default:
      style.fontSize = fontSize;
      style.fontWeight = "regular";
      style.fontFamily = "Inter_400Regular";
      break;
  }
  switch (props.weight) {
    case "regular":
      style.fontFamily = "Inter_400Regular";
      break;
    case "medium":
      style.fontFamily = "Inter_500Medium";
      break;
    case "semibold":
      style.fontFamily = "Inter_600SemiBold";
      break;
    case "bold":
      style.fontFamily = "Inter_700Bold";
      break;
    default:
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
