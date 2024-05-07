import { GestureResponderEvent, PressableProps, StyleSheet } from "react-native";
import React from "react";
import AnimatedPressable from "./AnimatedPressable";
import { ThemeProps, View } from "../Themed";
import { Heading2 } from "../StyledText";
interface iProps extends PressableProps, ThemeProps {
  onPress: (event: GestureResponderEvent) => void;
  children: string;
  style?: any;
}
const Button = (props: iProps) => {
  const { onPress, style, ...otherProps } = props;
  return (
    <AnimatedPressable onPress={onPress}>
      <View colorName="buttonBackground" style={[styles.button, style]}>
        <Heading2 colorName="background" size={20} colorInverted>
          {props.children}
        </Heading2>
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
