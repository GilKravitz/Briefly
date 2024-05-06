import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Heading, Heading2 } from "@/components/StyledText";
import { t } from "@/i18n";
import TagSelect from "@/components/pressable/TagSelect";
import Button from "@/components/pressable/Button";
import { router } from "expo-router";

const tags = ["Tech", "Money", "Politics", "Sports", "Food"];
const index = () => {
  return (
    <Container>
      <Heading style={styles.title}>{t.selectTopics.title}</Heading>
      <Heading2 style={styles.subheading} size={20}>
        {t.selectTopics.subheading}
      </Heading2>
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <TagSelect key={tag} label={tag} onPress={(isSelected) => console.log(tag, isSelected)} selected={false} />
        ))}
      </View>
      <Button style={styles.nextButton} onPress={() => router.replace("/(tabs)")}>
        {t.selectTopics.btnText}
      </Button>
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
  },
  subheading: {
    marginTop: 10,
  },
  tagsContainer: {
    marginTop: 50,
    width: "100%",
    gap: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  nextButton: {
    marginTop: 50,
    width: 175,
    alignSelf: "center",
  },
});
