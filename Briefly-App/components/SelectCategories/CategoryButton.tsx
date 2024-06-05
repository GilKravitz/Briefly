import { ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedPressable from "../pressable/AnimatedPressable";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Colors from "@/core/constants/Colors";
import i18nLabel from "@/utils/articleCatagoryText";
import { Text, ViewProps } from "@/components/Themed";
import { Category } from "@/types";

const springConfig = {
  mass: 0.3,
  stiffness: 55,
  damping: 8,
};

interface iProps extends ViewProps {
  onPress: (isSelected: boolean) => void;
  category: Category;
  selected: boolean;
  entering?: any;
}
const CategoryButton = (props: iProps) => {
  const [isSelected, setIsSelected] = useState(props.selected);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const height = useSharedValue(0);

  const onLayout = (event: any) => {
    const h = event.nativeEvent.layout.height;
    setLayoutHeight(h);
    if (props.selected) height.value = withSpring(h, springConfig);
    else height.value = withSpring(h * 0.33, springConfig);
  };

  const handlePress = () => {
    const newSelected = !isSelected;
    setIsSelected(newSelected);
    props.onPress(newSelected);
  };

  useEffect(() => {
    if (isSelected) height.value = withSpring(layoutHeight, springConfig);
    else height.value = withSpring(layoutHeight * 0.33, springConfig);
  }, [isSelected]);

  useEffect(() => {
    setIsSelected(props.selected);
  }, [props.selected]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(height.value, [layoutHeight * 0.33, layoutHeight], [0, 1], Extrapolation.CLAMP),
    };
  });
  return (
    <Animated.View style={styles.container} onLayout={onLayout} entering={props.entering}>
      <AnimatedPressable onPress={handlePress}>
        <ImageBackground source={props.category.image} style={styles.imageBackground}>
          <Animated.View style={[styles.overlay, animatedStyle]}>
            <Text variant="heading" colorName="background">
              {i18nLabel(props.category.name)}
            </Text>
            <Animated.View style={animatedIconStyle}>
              <FontAwesome name="check-circle" size={24} color={Colors.light.background} />
            </Animated.View>
          </Animated.View>
        </ImageBackground>
      </AnimatedPressable>
    </Animated.View>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: "33%",
    maxWidth: "50%",
  },
  imageBackground: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
