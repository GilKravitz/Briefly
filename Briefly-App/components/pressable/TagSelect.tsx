import { PressableProps, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedPressable from "./AnimatedPressable";
import { ThemeProps, View, ViewProps } from "../Themed";
import { Heading2 } from "../StyledText";
import Colors from "@/constants/Colors";
import TagSvgIcon from "../TagSvgIcons";

interface iProps extends ViewProps {
  onPress: (isSelected: boolean) => void;
  label: string;
  selected: boolean;
}
const TagSelect = (props: iProps) => {
  const { onPress, style, selected, ...otherProps } = props;
  // handle the press event - toggle the selected state
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handlePress = useCallback(() => {
    setIsSelected((prev) => !prev);
    onPress(isSelected);
  }, [isSelected, onPress]);

  // map the label to an matching icon component
  const Icon = ({ colorInverted }: { colorInverted: boolean }) => {
    switch (props.label) {
      case "Tech":
        return <TagSvgIcon.Tech colorInverted={colorInverted} />;
      case "Politics":
        return <TagSvgIcon.Politics colorInverted={colorInverted} />;
      case "Sports":
        return <TagSvgIcon.Sports colorInverted={colorInverted} />;
      case "Money":
        return <TagSvgIcon.Money colorInverted={colorInverted} />;
      default:
        return <TagSvgIcon.Tech colorInverted={colorInverted} />;
    }
  };

  const bgLight = isSelected ? Colors.light.primary : Colors.light.inputBackground;
  const bgDark = isSelected ? "#000" : Colors.dark.inputBackground;
  const txtLight = isSelected ? Colors.light.background : Colors.light.text;
  const txtDark = isSelected ? Colors.dark.primary : Colors.dark.background;

  return (
    <AnimatedPressable onPress={handlePress}>
      <View lightColor={bgLight} darkColor={bgDark} style={[styles.button]}>
        <Heading2 lightColor={txtLight} darkColor={txtDark}>
          {props.label}
        </Heading2>
        <Icon colorInverted={isSelected} />
      </View>
    </AnimatedPressable>
  );
};

export default TagSelect;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 64,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.light.textMuted,
  },
});
