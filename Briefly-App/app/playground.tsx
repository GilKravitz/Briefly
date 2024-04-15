import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Heading, Heading2, Heading3, Text, MutedText } from "@/components/StyledText";
import { View } from "@/components/Themed";
import BackButton from "@/components/pressable/BackButton";
import Button from "@/components/pressable/Button";
import TagSvgIcon from "@/components/TagSvgIcons";
import TagSelect from "@/components/pressable/TagSelect";
import Input from "@/components/Input";

const switchTheme = () => {
  // switch the theme color from light to dark and vice versa
  console.log("Switch Theme");
};
const Index: React.FC = () => {
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => console.log("Container")}>
        <Text>Switch Theme</Text>
      </TouchableOpacity>
      <Container>
        <Heading>Texts Components</Heading>
        <Heading>Heading</Heading>
        <Heading2>Heading2</Heading2>
        <Heading3>Heading3</Heading3>
        <Text>Text</Text>
        <MutedText>MutedText</MutedText>
        <Text>------------------------------------</Text>
        <Heading>Back Button</Heading>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <BackButton onPress={() => console.log("Back Button")} />
          <BackButton onPress={() => console.log("Back Button muted")} colorName="textMuted" />
        </View>
        <Text>------------------------------------</Text>
        <Heading>Button</Heading>
        <Button onPress={() => console.log("Button")}>Button</Button>
        <Text>------------------------------------</Text>
        <Heading>Tag Icons</Heading>
        <View style={{ flexDirection: "row", gap: 50, width: "100%" }}>
          <TagSvgIcon.Tech />
          <TagSvgIcon.Politics />
          <TagSvgIcon.Sports />
          <TagSvgIcon.Money />
        </View>
        <Text>------------------------------------</Text>
        <Heading>Tag Select</Heading>
        <View style={{ gap: 10, width: "100%" }}>
          <TagSelect label="Tech" onPress={(isSelected) => console.log("Tech", isSelected)} selected={false} />
          {/* <TagSelect label="Money" onPress={(isSelected) => console.log("Tech", isSelected)} selected={false} /> */}
          {/* <TagSelect label="Sports" onPress={(isSelected) => console.log("Tech", isSelected)} selected={false} /> */}
          {/* <TagSelect label="Politics" onPress={(isSelected) => console.log("Tech", isSelected)} selected={false} /> */}
        </View>
        <Text>------------------------------------</Text>
        <Heading>Input</Heading>
        {/* <Input /> */}
        <Input placeholder="Email" icon={<TagSvgIcon.Tech />} />
      </Container>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({});
