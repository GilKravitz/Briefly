import React, { useCallback } from "react";
import { StyleSheet, Pressable, PressableProps, StyleProp, ViewStyle, GestureResponderEvent } from "react-native";
import Animated, { useSharedValue, withSpring, runOnJS } from "react-native-reanimated";

interface AnimatedPressableProps extends PressableProps {
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
const springConfig = {
  mass: 1,
  stiffness: 500,
  damping: 5,
};
const AnimatedPressable = (props: AnimatedPressableProps) => {
  const { onPress, children } = props;
  const scale = useSharedValue(1);

  const onPressIn = (event: GestureResponderEvent) => {
    scale.value = withSpring(0.95, springConfig);
  };

  const onPressOut = (event: GestureResponderEvent) => {
    scale.value = withSpring(1, springConfig, () => runOnJS(onPress)?.call(null, event));
  };
  return (
    <Pressable style={[styles.container, props.containerStyle]} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            transform: [{ scale: scale }],
          },
          props.style as StyleProp<ViewStyle>,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inner: {},
});

export default React.memo(AnimatedPressable);
