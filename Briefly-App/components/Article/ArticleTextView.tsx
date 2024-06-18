import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ArticleText } from "@/types";
import { View, Text } from "@/components/Themed";
import { parseArticleText } from "@/utils/articleText";
import { useFontSize } from "@/core/store/fontSizeContext";

type ArticleTextProps = {
  content: string;
};
const ArticleTextView = (props: ArticleTextProps) => {
  const [parsedArticle, setParsedArticle] = React.useState<ArticleText[]>([]);
  const { fontSize } = useFontSize();
  useEffect(() => {
    setParsedArticle(parseArticleText(props.content));
  }, []);
  return (
    <>
      {parsedArticle.map((element, index) => (
        <View style={{ width: "100%" }} key={`articleBullet${index}`}>
          {element.subheading && (
            <Text weight="semibold" variant="subheading" style={[styles.articleText]}>
              {element.subheading}
            </Text>
          )}
          {element.paragraph && <Text>{element.paragraph}</Text>}
          {element.bullets && (
            <View style={styles.bullets}>
              {element.bullets.map((bullet, i) => (
                <Text key={`articleBullet${index}_${i}`}>• {bullet}</Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </>
  );
};

export default React.memo(ArticleTextView);

const styles = StyleSheet.create({
  articleText: {
    width: "100%",
  },
  bullets: {
    marginRight: 15,
  },
});
