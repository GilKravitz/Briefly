import { Keyboard, StyleSheet, TextInput } from "react-native";
import { View } from "@/components/Themed";
import { Heading, Text } from "@/components/StyledText";
import Container from "@/components/Container";
import React, { useRef, useState } from "react";
import BackButton from "@/components/pressable/BackButton";
import { router } from "expo-router";
import { t } from "@/i18n";
import LottieView from "lottie-react-native";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordRef = useRef<TextInput>(null);
  return (
    <Container>
      <BackButton onPress={() => router.back()} />
      <Heading>{t.setNewPassword.title}</Heading>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/setNewPassword.json")} />

      <Input
        placeholder="Password"
        returnKeyType="next"
        keyboardType="visible-password"
        secureTextEntry={true}
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        value={password}
        onChangeText={setPassword}
        style={styles.passwordInput}
      />

      <Input
        placeholder="Confirm Password"
        returnKeyType="done"
        keyboardType="visible-password"
        secureTextEntry={true}
        onSubmitEditing={() => Keyboard.dismiss()}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        ref={confirmPasswordRef}
      />
      <Button style={styles.button} onPress={() => router.replace("/(tabs)/")}>
        {t.setNewPassword.btnText}
      </Button>
    </Container>
  );
};

export default SetNewPassword;

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
  passwordInput: {
    marginBottom: 20,
  },
});
