import Colors from "@/constants/Colors";
import React from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import { useThemeColor } from "./Themed";
import { View } from "./Themed";
type TextInputProps = TextInput["props"];

export interface iProp extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
}
export default React.forwardRef<TextInput, iProp>((props, ref) => {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, "inputBackground");
  if (props.icon) {
    return (
      <View row style={{ alignItems: "center" }}>
        <TextInput ref={ref} style={[styles.input, { backgroundColor }, style]} {...otherProps} />
        <View style={{ position: "absolute", right: 16 }}>{props.icon}</View>
      </View>
    );
  }
  return <TextInput ref={ref} style={[styles.input, { backgroundColor }, style]} {...otherProps} />;
});

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 15,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
});
