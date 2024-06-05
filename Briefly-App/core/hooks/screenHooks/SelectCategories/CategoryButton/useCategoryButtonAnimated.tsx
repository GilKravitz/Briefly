import { useState, useEffect, useCallback } from "react";
import { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

const springConfig = {
  mass: 0.3,
  stiffness: 55,
  damping: 8,
};

const useCategoryButtonAnimated = (initialSelected: boolean, layoutHeight: number) => {
  const [isSelected, setIsSelected] = useState(initialSelected);
  const height = useSharedValue(0);

  useEffect(() => {
    if (isSelected) height.value = withSpring(layoutHeight, springConfig);
    else height.value = withSpring(layoutHeight * 0.33, springConfig);
  }, [isSelected, layoutHeight]);

  useEffect(() => {
    setIsSelected(initialSelected);
  }, [initialSelected]);

  const handlePress = useCallback(() => {
    setIsSelected((prev) => !prev);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(height.value, [layoutHeight * 0.33, layoutHeight], [0, 1], Extrapolation.CLAMP),
  }));

  return {
    isSelected,
    handlePress,
    animatedStyle,
    animatedIconStyle,
    height,
    springConfig,
  };
};

export default useCategoryButtonAnimated;
