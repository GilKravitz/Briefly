import { StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import Container from "@/components/Container";
import React, { useRef, useState } from "react";
import i18n, { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Checkbox from "expo-checkbox";
import Button from "@/components/pressable/Button";
import { Link, router } from "expo-router";
import { Text } from "@/components/Themed";

export default function SignUp() {
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checked, setChecked] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const handleSignUp = () => {
    router.replace("/(app)/SelectTopics");
  };

  const FormMessage = React.memo(() => {
    if (signUpError) {
      return <Text colorName="error">{t.signUp.signupError}</Text>;
    }
    return <Text colorName="textMuted">{t.signIn.signInMutedMsg}</Text>;
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Container>
          <BackButton onPress={() => router.back()} />
          <Text variant="title" style={styles.title}>
            {t.signUp.title}
          </Text>
          <SocialButtons style={styles.socialButtons} />
          {/* <Text colorName="textMuted">{t.signUp.signUpMutedMsg}</Text> */}
          <FormMessage />
          <View style={styles.form}>
            <Input
              ref={nameRef}
              placeholder="Name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              value={name}
              onChangeText={setName}
            />
            <Input
              ref={emailRef}
              placeholder="Email Address"
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => passwordRef.current?.focus()}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              ref={passwordRef}
              placeholder="Password"
              onSubmitEditing={() => Keyboard.dismiss}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <View row style={{ justifyContent: "space-between", paddingVertical: 5, width: "100%" }}>
              <View row style={styles.privacyPolicyWrapper}>
                <Text colorName="textMuted">{t.signUp.iHaveRead}</Text>
                <Link push href="/(auth)/PrivacyPolicy">
                  <Text variant="subheading" size={16}>
                    {t.signUp.privacyPolicy}
                  </Text>
                </Link>
              </View>
              <Checkbox value={checked} onValueChange={setChecked} />
            </View>
          </View>
          <Button onPress={handleSignUp}>{t.signUp.getStarted}</Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
  },
  socialButtons: {
    marginVertical: 40,
  },
  form: {
    width: "100%",
    gap: 20,
    marginVertical: 20,
  },
  privacyPolicyWrapper: {
    gap: 5,
  },
});
