import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { t } from "@/core/i18n";
import Button from "@/components/pressable/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import categoriesAll from "@/core/constants/categoriesAll";
import Persistent from "@/core/persistent";
import { View, Text } from "@/components/Themed";
import LottieView from "lottie-react-native";
import useSelectCategories from "@/core/hooks/screenHooks/SelectCategories";
import CategoryButton from "@/components/SelectCategories/CategoryButton";
import FormLoadingModal from "@/components/FormLoadingModal";

const SelectCategories = () => {
  const { categories, handleSaveCategories, status, mutationStatus, handleCategorySelection } = useSelectCategories();

  if (status === "pending") {
    return (
      <Container>
        <View style={styles.lottieContainer}>
          <LottieView style={styles.lottie} source={require("@/assets/lottie/settings.json")} autoPlay loop />
        </View>
      </Container>
    );
  }
  return (
    <ScrollView>
      <Container>
        <Animated.View entering={FadeInDown} style={styles.headingContainer}>
          <Text variant="title" style={styles.title}>
            {t.selectCategories.title}
          </Text>
          <Text variant="heading" style={styles.subheading} size={20}>
            {t.selectCategories.subheading}
          </Text>
        </Animated.View>
        <View style={styles.tagsContainer}>
          {categoriesAll.map((category, i) => (
            <CategoryButton
              entering={FadeInDown.delay(100 + i * 100)}
              key={category.name}
              category={category}
              onPress={(isSelected) => handleCategorySelection(isSelected, category.name)}
              selected={categories.includes(category.name)}
            />
          ))}
        </View>
        <Button style={styles.nextButton} onPress={handleSaveCategories}>
          {t.selectCategories.btnText}
        </Button>
      </Container>
      <FormLoadingModal status={mutationStatus} />
    </ScrollView>
  );
};

export default SelectCategories;

const styles = StyleSheet.create({
  headingContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
  },
  subheading: {
    marginTop: 5,
  },
  tagsContainer: {
    marginTop: 50,
    width: "100%",
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  nextButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  lottieContainer: {
    position: "absolute",
    alignItems: "center",
    top: "30%",
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
