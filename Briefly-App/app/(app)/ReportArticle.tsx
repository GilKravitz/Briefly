import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useArticle } from "@/core/store/articleContext";
import Container from "@/components/Container";
import { Heading } from "@/components/StyledText";
import LottieView from "lottie-react-native";
import BackButton2 from "@/components/pressable/BackButton2";
import { t } from "@/core/i18n";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";
const ReportArticle = () => {
  const { article } = useArticle();
  const handleSendReport = () => {
    console.log(`Report sent on article: ${article.id}`);
  };
  return (
    <Container>
      <View style={styles.backButtonContainer}>
        <BackButton2 variant="dark" />
      </View>
      <Heading style={styles.heading}>{t.article.reportArticle.title}</Heading>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/report.json")} />
      <View style={styles.form}>
        <Input placeholder={t.article.reportArticle.reportDetail} />
        <Input
          style={styles.textArea}
          multiline={true}
          numberOfLines={10}
          placeholder={t.article.reportArticle.reportReasonLabel}
        />
        <Button onPress={handleSendReport}>{t.article.reportArticle.reportBtn}</Button>
      </View>
    </Container>
  );
};

export default ReportArticle;

const styles = StyleSheet.create({
  heading: {
    marginTop: 40,
  },
  backButtonContainer: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  form: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
  textArea: {
    height: 200,
    width: "100%",
    textAlignVertical: "top",
  },
});
