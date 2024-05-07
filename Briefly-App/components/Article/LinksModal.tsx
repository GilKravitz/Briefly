import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import Colors from "@/constants/Colors";
import { getArticleProvider } from "@/utils/articleLinkProvider";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Image } from "expo-image";
import { Text } from "@/components/StyledText";
import * as WebBrowser from "expo-web-browser";

type LinksModalProps = {
  links: string[];
  open: boolean;
};

const springConfig = {
  mass: 0.5,
  stiffness: 100,
  damping: 15,
};
const LinksModal = (props: LinksModalProps) => {
  const { links } = props;
  const translateY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const providers = useMemo(() => {
    return links.map((link) => getArticleProvider(link));
  }, [links]);

  useEffect(() => {
    translateY.value = withSpring(props.open ? 0 : 150, springConfig);
  }, [props.open]);

  const handlePressButtonAsync = async (link: string) => {
    await WebBrowser.openBrowserAsync(link);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {providers.map((provider, index) => (
        <TouchableOpacity
          onPress={() => handlePressButtonAsync(provider.link)}
          key={`${provider}${index}`}
          style={styles.provider}
        >
          <Image style={styles.providerLogo} source={provider.logo} />
          <Text colorName="textMuted">{provider.name}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default LinksModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: 150,
    zIndex: 1,
    backgroundColor: Colors.light.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  provider: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  providerLogo: {
    width: 60,
    height: 60,
  },
});
