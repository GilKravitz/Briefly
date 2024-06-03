import { useCallback, useState } from "react";
import useCategoryButtonAnimated from "./useCategoryButtonAnimated";
import { withSpring } from "react-native-reanimated";

const useCategoryButton = (initialSelected: boolean) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const { isSelected, handlePress, animatedStyle, animatedIconStyle, height, springConfig } = useCategoryButtonAnimated(
    initialSelected,
    layoutHeight
  );

  const onLayout = (event: any) => {
    const h = event.nativeEvent.layout.height;
    setLayoutHeight(h);
    if (initialSelected) height.value = withSpring(h, springConfig);
    else height.value = withSpring(h * 0.33, springConfig);
  };

  const onPress = useCallback((cb: any) => {
    handlePress();
    cb();
  }, []);

  return {
    isSelected,
    onPress,
    animatedStyle,
    animatedIconStyle,
    onLayout,
  };
};

export default useCategoryButton;
