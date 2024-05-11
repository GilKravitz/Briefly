import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useArticle } from "@/core/store/articleContext";
import Container from "@/components/Container";
import LottieView from "lottie-react-native";
import BackButton2 from "@/components/pressable/BackButton2";
import { t } from "@/core/i18n";
import { Picker } from "@react-native-picker/picker";
import Button from "@/components/pressable/Button";
import Input from "@/components/Input";
import { View, Text } from "@/components/Themed";
const resonsLables = ["offensive", "incorrect", "inappropriate", "other"];
const ReportArticle = () => {
  const { article } = useArticle();
  const [value, setValue] = useState(resonsLables[0]);
  const [description, setDescription] = useState("");

  const handleSendReport = () => {
    console.log(`Report sent on article: ${article.id}`);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Container>
      <View style={styles.backButtonContainer}>
        <BackButton2 variant="dark" />
      </View>
      <Text variant="title" style={styles.heading}>
        {t.article.reportArticle.title}
      </Text>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/report.json")} />
      <View style={styles.form}>
        <View style={{ width: "100%" }}>
          <Picker
            selectedValue={value}
            onValueChange={(v) => setValue(v)}
            accessibilityLabel="Basic Picker Accessibility Label"
            style={{ width: "100%" }}
          >
            {resonsLables.map((label) => (
              <Picker.Item
                key={label}
                label={t.article.reportArticle.reportReason[label as keyof typeof t.article.reportArticle.reportReason]}
                value={label}
              />
            ))}
          </Picker>

          <Input
            placeholder={t.article.reportArticle.reportDetail}
            multiline={true}
            numberOfLines={4}
            editable={value === "other"}
            style={{ opacity: value === "other" ? 1 : 0 }}
            value={description}
            onChangeText={setDescription}
          />
        </View>
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
    alignItems: "center",

    gap: 20,
    flex: 1,
  },
  textArea: {
    width: "100%",
    textAlignVertical: "top",
  },
});
