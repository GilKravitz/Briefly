import { Article, Topic } from "@/api/types";
import { TouchableOpacity, StyleSheet } from "react-native";
import { View } from "../Themed";
import { Heading2, Text } from "../StyledText";
import TagSvgIcon from "@/components/TagSvgIcons";
type ListItemProps = {
  article: Article;
  onPress: () => void;
};

const dateFormat = (date: Date) => {
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

type IconProps = {
  topic: Topic;
};
const Icon = (props: IconProps) => {
  const { topic } = props;
  switch (topic.name) {
    case "Tech":
      return <TagSvgIcon.Tech />;
    case "Politics":
      return <TagSvgIcon.Politics />;
    case "Sports":
      return <TagSvgIcon.Sports />;
    case "Money":
      return <TagSvgIcon.Money />;
    default:
      null;
  }
};
export default function ListItem(props: ListItemProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={listItemStyles.container}>
        <View style={listItemStyles.iconContainer}>
          <Icon topic={props.article.topics[0]} />
        </View>

        <View style={listItemStyles.contetContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 5 }}>
            <Heading2 style={{ flex: 0.95, fontSize: 16, fontWeight: "600" }} size={16}>
              {props.article.title}
            </Heading2>
            <Text colorName="textMuted">{dateFormat(props.article.createdAt)}</Text>
          </View>
          <Text numberOfLines={3} size={14}>
            {props.article.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    flex: 1,
    width: "100%",
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
