import { StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View, ViewProps } from "./Themed";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
  paddingHorizontal?: number;
}
const Container = (props: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const paddingTop = props.paddingTop ?? insets.top;
  const paddingBottom = props.paddingBottom ?? insets.bottom;
  const paddingHorizontal = props.paddingHorizontal ?? 24;
  return (
    <View
      {...props}
      style={[
        {
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
          paddingHorizontal: paddingHorizontal,
        },
        styles.container,
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

export default Container;

import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    minHeight: height,
  },
});
