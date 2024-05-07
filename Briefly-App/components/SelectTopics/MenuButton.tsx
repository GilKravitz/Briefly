import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedPressable from "../pressable/AnimatedPressable";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { t } from "@/i18n";

type MenuButtonProps = {
  onBookmarkPress: () => void;
  onReportPress: () => void;
  onExternalLinksPress: () => void;
  isBookmarked?: boolean;
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
};
const MenuButton = (props: MenuButtonProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpacity = useSharedValue(0);

  const menuStyle = useAnimatedStyle(() => {
    return {
      opacity: menuOpacity.value,
      display: menuOpacity.value === 0 ? "none" : "flex",
    };
  });

  useEffect(() => {
    setMenuOpen(props.menuIsOpen);
  }, [props.menuIsOpen]);

  useEffect(() => {
    menuOpacity.value = menuOpen ? withTiming(1) : withTiming(0);
    props.setMenuIsOpen(menuOpen);
  }, [menuOpen]);

  const menuButtonOnPress = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <AnimatedPressable containerStyle={{ alignItems: "flex-end" }} onPress={menuButtonOnPress}>
        <View style={styles.buttonContainer}>
          <FontAwesome name="ellipsis-v" size={25} color={Colors.light.primary} />
        </View>
      </AnimatedPressable>

      <Animated.View style={[menuStyle, styles.menuContainer]}>
        <TouchableOpacity onPress={props.onBookmarkPress}>
          <View style={styles.menuItem}>
            <Text>{t.article.menu.bookmark}</Text>
            <FontAwesome name={props.isBookmarked ? "bookmark" : "bookmark-o"} size={20} color={Colors.light.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onReportPress}>
          <View style={[styles.menuItem, styles.seperator]}>
            <Text>{t.article.menu.report}</Text>
            <FontAwesome name="pencil" size={20} color={Colors.light.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onExternalLinksPress}>
          <View style={[styles.menuItem, styles.seperator]}>
            <Text>קישורים</Text>
            <FontAwesome name="external-link" size={20} color={Colors.light.primary} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: Colors.light.background,
  },
  menuContainer: {
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    padding: 16,
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  seperator: {
    borderTopWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
    paddingTop: 10,
  },
});
