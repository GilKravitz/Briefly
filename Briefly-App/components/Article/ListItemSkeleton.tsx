import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from "react-native-reanimated";
import Colors from "@/core/constants/Colors";

const ListItemSkeleton = () => {
  const sv = useSharedValue<number>(0.2);
  useEffect(() => {
    sv.value = withRepeat(withSpring(1, { mass: 0.5, damping: 1, stiffness: 5 }), -1, true);
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: sv.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.contentContainer}>
        <View style={{ width: 100, height: 15, borderRadius: 10, backgroundColor: Colors.lightGray }} />
        <View style={{ width: "100%", height: 20, borderRadius: 10, backgroundColor: Colors.lightGray }} />
        <View style={{ width: "100%", height: 15, borderRadius: 10, backgroundColor: Colors.lightGray }} />
      </View>
      <View style={{ width: 140, height: 100, borderRadius: 10, backgroundColor: Colors.lightGray }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    width: "100%",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    gap: 5,
  },
  img: {
    width: 140,
    height: 100,
    borderRadius: 10,
  },
});
export default ListItemSkeleton;
