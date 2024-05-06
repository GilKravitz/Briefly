import { TouchableOpacity, StyleSheet } from "react-native";
import { View } from "../Themed";
import { Heading2, Text } from "../StyledText";
import TagSvgIcon from "@/components/TagSvgIcons";
import { Article } from "@/types";
import { Image } from "expo-image";

type ListItemProps = {
  article: Article;
  onPress: () => void;
};

const dateFormat = (dateStr: string) => {
  let date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const seconds = diff / 1000;
  if (seconds < 60) {
    return "Just now";
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)} min`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)} h`;
  }
  const days = hours / 24;
  if (days < 7) {
    return `${Math.floor(days)} days`;
  }
  return date.toLocaleDateString();
};

export default function ListItem(props: ListItemProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={listItemStyles.container}>
        <View style={listItemStyles.contetContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 5 }}>
            <Heading2 style={{ flex: 0.95, fontSize: 16, fontWeight: "600" }} size={16}>
              {props.article.title}
            </Heading2>
            <Text colorName="textMuted">{dateFormat(props.article.publish_date)}</Text>
          </View>
        </View>
      </View>
      <Image source={{ uri: props.article.s3_image }} style={{ width: "100%", height: 200 }} />
    </TouchableOpacity>
  );
}

const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    flex: 1,
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  contetContainer: {
    gap: 10,
    flex: 1,
  },
});
