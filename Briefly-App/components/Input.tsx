import Colors from "@/core/constants/Colors";
import React, { forwardRef } from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import { useThemeColor } from "./Themed";
import { View } from "./Themed";
import { useDirection } from "@/core/hooks/useDirection";
type TextInputProps = TextInput["props"];
export interface iProp extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
}
type Ref = TextInput;

const Input = forwardRef<Ref, iProp>((props, ref) => {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, "inputBackground");
  const placeholder = useThemeColor({}, "placeholder");
  const dir = useDirection();
  const textAlign = dir === "rtl" ? "right" : "left";
  return (
    <TextInput
      placeholderTextColor={placeholder}
      ref={ref}
      style={[styles.input, { backgroundColor, textAlign }, style]}
      {...otherProps}
    />
  );
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

export default React.memo(Input);
// export default Input;
