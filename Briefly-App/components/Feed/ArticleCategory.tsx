import { StyleSheet, View } from "react-native";
import React from "react";
import i18nLabel from "@/utils/articleCatagoryText";
import { getBgColor, getTextColor } from "@/utils/articleCatagoryColor";
import { Text } from "../StyledText";

type ArticleCategoryProps = {
  category: string;
};
const ArticleCategory = (props: ArticleCategoryProps) => {
  const textColor = getTextColor(props.category);
  const bgColor = getBgColor(props.category);
  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor: textColor }]}>
      <Text size={12} style={{ color: textColor }}>
        {i18nLabel(props.category)}
      </Text>
    </View>
  );
};

export default ArticleCategory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 0.15,
    alignSelf: "flex-start",
  },
});
