import Colors from "@/core/constants/Colors";
import React, { forwardRef } from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import { useThemeColor } from "./Themed";
import { View, Text } from "./Themed";
import { useDirection } from "@/core/hooks/useDirection";
type TextInputProps = TextInput["props"];
export interface iProp extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  error?: string;
}
type Ref = TextInput;

const Input = forwardRef<Ref, iProp>((props, ref) => {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor("inputBackground");
  const placeholder = useThemeColor("placeholder");
  const borderColor = props.error ? Colors.error : backgroundColor;
  const dir = useDirection();
  const textAlign = dir === "rtl" ? "right" : "left";
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={placeholder}
        ref={ref}
        style={[styles.input, { backgroundColor, textAlign, borderColor }, style]}
        {...otherProps}
      />
      {props.error && <Text colorName="error">{props.error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  error: {
    borderColor: Colors.error,
  },
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
    borderWidth: 1,
  },
});

export default React.memo(Input);
// export default Input;
