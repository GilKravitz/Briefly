import { GestureResponderEvent, PressableProps, StyleSheet } from "react-native";
import React from "react";
import AnimatedPressable from "./AnimatedPressable";
import { View, Text } from "../Themed";
type ButtonProps = {
  onPress: () => void;
  style?: any;
  children: string;
};
const Button = (props: ButtonProps) => {
  return (
    <AnimatedPressable onPress={props.onPress}>
      <View colorName="buttonBackground" style={[styles.button, props.style]}>
        <Text colorName="buttonForeground" variant="subheading" style={{ fontWeight: "bold" }}>
          {props.children}
        </Text>
      </View>
    </AnimatedPressable>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 64,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
