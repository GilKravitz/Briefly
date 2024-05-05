import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { Heading } from "@/components/StyledText";
import articles from "@/data/articles";

import Svg, { Path, SvgProps } from "react-native-svg";
import ListItem from "@/components/Feed/ListItem";
const Logo = (props: SvgProps) => (
  <Svg width={92} height={109} fill="none" {...props}>
    <Path
      fill="#2D2D2D"
      d="M0 0v91.974h46.379c32.583 0 46.773-33.768 25.753-49.273C87.372 25.882 72.915 0 47.822 0H0ZM75.725 94.664a2.69 2.69 0 0 1 2.69-2.69h10.76a2.69 2.69 0 0 1 2.69 2.69v10.76a2.69 2.69 0 0 1-2.69 2.69h-10.76a2.69 2.69 0 0 1-2.69-2.69v-10.76Z"
    />
  </Svg>
);
const index = () => {
  return (
    <Container>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ListItem article={item} onPress={() => console.log("pressed")} />}
        keyExtractor={(item) => item.id.toString() + item.title}
        ItemSeparatorComponent={() => (
          <View style={{ height: 20, borderBottomWidth: 1, marginBottom: 20, borderColor: "#b8b9ba" }} />
        )}
        // extraData={selectedId}
        style={styles.list}
        contentContainerStyle={{ width: "100%", paddingBottom: 50 }}
        ListHeaderComponent={<Logo />}
        ListHeaderComponentStyle={{ alignItems: "center", marginBottom: 30 }}
      />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginTop: 50,
  },
});
