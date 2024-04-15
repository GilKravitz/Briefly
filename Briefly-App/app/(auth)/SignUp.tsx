import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "@/components/Themed";
import { Text, Heading } from "@/components/StyledText";
import Container from "@/components/Container";
import React, { useRef, useState } from "react";
import i18n from "@/i18n";
import BackButton from "@/components/pressable/BackButton";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Checkbox from "expo-checkbox";
import Button from "@/components/pressable/Button";
import { router } from "expo-router";

const SignIn = () => {
  const [isChecked, setChecked] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const FormView = () => {
    return (
      <>
        <View style={styles.inputsWrapper}>
          <Input
            ref={nameRef}
            placeholder="Name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Input
            ref={emailRef}
            placeholder="Email Address"
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <Input
            ref={passwordRef}
            placeholder="Password"
            onSubmitEditing={() => Keyboard.dismiss}
            secureTextEntry={true}
          />
        </View>

        <View row style={styles.privacyPolicyWrapper}>
          <Text colorName="textMuted">
            {i18n.t("signUp.iHaveRead")} {i18n.t("signUp.privacyPolicy")}
          </Text>
          <Checkbox value={isChecked} onValueChange={setChecked} />
        </View>
      </>
    );
  };

  return (
    <Container style={{ alignItems: "flex-start" }}>
      <BackButton style={styles.backBtn} onPress={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{}}>
            <View style={styles.container}>
              <Heading>{i18n.t("signUp.title")}</Heading>
              <SocialButtons style={{ marginTop: 40 }} />

              <Text style={{ marginTop: 40 }} colorName="textMuted">
                {i18n.t("signUp.signUpMutedMsg")}
              </Text>

              <FormView />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <Button style={styles.signUpBtn} onPress={() => console.log("ok")}>
          {i18n.t("signUp.getStarted")}
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  backBtn: {
    alignSelf: "flex-start",
  },
  inputsWrapper: {
    marginTop: 25,
    gap: 20,
    width: "100%",
  },
  privacyPolicyWrapper: {
    marginTop: 20,
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
  },
  signUpBtn: {
    marginBottom: 15,
    // marginTop: "auto",
    // flex: 1,
  },
});
