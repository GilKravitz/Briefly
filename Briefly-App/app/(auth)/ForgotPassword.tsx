import { Keyboard, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import Container from "@/components/Container";
import React from "react";
import { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const handlePress = () => {
    router.push("/(auth)/Otp");
  };
  return (
    <Container>
      <BackButton onPress={() => router.back()} />
      <Text variant="title">{t.forgotPassword.title}</Text>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/forgotPassword.json")} />

      <Input
        placeholder="Email Address"
        returnKeyType="done"
        keyboardType="email-address"
        onSubmitEditing={() => Keyboard.dismiss()}
        value={email}
        onChangeText={setEmail}
      />
      <Button style={styles.button} onPress={handlePress}>
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
