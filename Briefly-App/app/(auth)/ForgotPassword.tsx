import { Keyboard, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Heading, Text } from "@/components/StyledText";
import Container from "@/components/Container";
import React from "react";
import { t } from "@/i18n";
import BackButton from "@/components/pressable/BackButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  return (
    <Container>
      <BackButton onPress={() => router.back()} />
      <Heading>{t.forgotPassword.title}</Heading>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/forgotPassword.json")} />

      <Input
        placeholder="Email Address"
        returnKeyType="done"
        keyboardType="email-address"
        onSubmitEditing={() => Keyboard.dismiss()}
        value={email}
        onChangeText={setEmail}
      />
      <Button style={styles.button} onPress={() => router.push("/(auth)/Otp")}>
        {t.forgotPassword.btnText}
      </Button>
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  backButtonWrapper: {
    width: "100%",
  },
  lottie: {
    width: "100%",
    height: 200,
    marginTop: 40,
  },
  button: {
    marginTop: 50,
  },
});
