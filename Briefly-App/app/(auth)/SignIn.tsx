import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { View } from "@/components/Themed";
import { Text, Heading, Heading3 } from "@/components/StyledText";
import Container from "@/components/Container";
import React, { useCallback, useRef, useState } from "react";
import { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Checkbox from "expo-checkbox";
import Button from "@/components/pressable/Button";
import { Link, router } from "expo-router";

export default function SignIn() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const FormMessage = React.memo(() => {
    if (loginError) {
      return <Text colorName="error">{t.signIn.loginError}</Text>;
    }
    return <Text colorName="textMuted">{t.signIn.signInMutedMsg}</Text>;
  });

  const handleLogin = async () => {
    router.push("/(app)/SelectTopics");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Container>
          <BackButton onPress={() => router.back()} />
          <Heading style={styles.title}>{t.signIn.welcome}</Heading>
          <SocialButtons style={styles.socialButtons} />
          <FormMessage />
          <View style={styles.form}>
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
              onSubmitEditing={() => Keyboard.dismiss()}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Button onPress={handleLogin}>{t.signUp.getStarted}</Button>

          <Link style={styles.forgotPassLink} push href="/(auth)/ForgotPassword">
            <Heading3 size={16}>{t.signIn.forgotPassword}</Heading3>
          </Link>
          <View row style={styles.signUpLinkWrapper}>
            <Text colorName="textMuted">{t.signIn.createAccount}</Text>
            <Link push href="/(auth)/SignUp">
              <Heading3 size={16}>{t.signIn.signupLink}</Heading3>
            </Link>
          </View>
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
  forgotPassLink: {
    marginTop: 20,
  },
  signUpLinkWrapper: {
    marginTop: 30,
    gap: 5,
    alignItems: "baseline",
  },
});
