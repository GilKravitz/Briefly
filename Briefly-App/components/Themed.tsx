/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useDirection } from "@/hooks/useDirection";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorInverted?: boolean;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"] & { row?: boolean };

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  colorInverted?: boolean
) {
  let theme = useColorScheme() ?? "light";
  theme = "light";

  if (colorInverted) {
    theme = theme === "light" ? "dark" : "light";
  }
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = { light: lightColor, dark: darkColor };
  const colorName = props.colorName ?? "text";

  const color = useThemeColor(theme, colorName);
  const dir = useDirection();
  const textAlign = dir === "rtl" ? "right" : "left";

  return <DefaultText style={[{ color, textAlign }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, row, lightColor, darkColor, colorInverted, ...otherProps } = props;
  const theme = colorInverted ? { light: darkColor, dark: lightColor } : { light: lightColor, dark: darkColor };
  const colorName = props.colorName ?? "background";
  const backgroundColor = useThemeColor(theme, colorName, colorInverted);
  const dir = useDirection();
  const flexDirection = () => {
    if (row) {
      return dir === "rtl" ? "row-reverse" : "row";
    }
    return "column";
  };

  return <DefaultView style={[{ backgroundColor, flexDirection: flexDirection() }, style]} {...otherProps} />;
}
