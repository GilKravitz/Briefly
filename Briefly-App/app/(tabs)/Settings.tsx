import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Container from "@/components/Container";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import Button from "@/components/pressable/Button";
import { useFontSize } from "@/core/store/fontSizeContext";
import { t } from "@/core/i18n";
import Persistent from "@/core/persistent";
const Settings = () => {
  const { fontSize, setFontSize } = useFontSize();
  const MAX_FONT_SIZE = 20;
  const MIN_FONT_SIZE = 12;

  useEffect(() => {
    Persistent.FontSize.saveFontSize(fontSize);
  }, [fontSize]);

  const increaseFontSize = async () => {
    if (fontSize < MAX_FONT_SIZE) {
      setFontSize((prev) => prev + 1);
    }
  };
  const decreaseFontSize = () => {
    if (fontSize > MIN_FONT_SIZE) {
      setFontSize((prev) => prev - 1);
    }
  };
  return (
    <Container>
      <Text style={styles.title} variant="title">
        {t.settings.title}
      </Text>

      <Text style={styles.heading} variant="heading">
        {t.settings.fontSize}
      </Text>
      <View style={styles.fontControl}>
        <View style={styles.buttonWrapper}>
          <Button onPress={increaseFontSize}>+</Button>
        </View>
        <Text variant="title">{fontSize}</Text>
        <View style={styles.buttonWrapper}>
          <Button onPress={decreaseFontSize}>-</Button>
        </View>
      </View>
      <View style={styles.spacer} />

      <Text style={styles.heading} variant="heading">
        {t.settings.updateInterests}
      </Text>
      <Button onPress={() => router.push("/(app)/SelectCategories")}>{t.settings.selectCategories}</Button>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  fontControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
  spacer: {
    height: 50,
  },
  heading: {
    marginBottom: 16,
  },
  title: {
    marginVertical: 30,
  },
});
