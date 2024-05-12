import { StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import Container from "@/components/Container";
import React, { useRef, useState } from "react";
import { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";
import { Link, router } from "expo-router";
import { Text } from "@/components/Themed";
import { useSession } from "@/core/store/sessionContext";

export default function SignIn() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const session = useSession();

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
    session.setToken("token");
    router.push("/(app)/SelectTopics");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Container>
          <BackButton onPress={() => router.back()} />
          <Text variant="title" style={styles.title}>
            {t.signIn.welcome}
          </Text>
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
            <Text variant="subheading" size={16}>
              {t.signIn.forgotPassword}
            </Text>
          </Link>
          <View row style={styles.signUpLinkWrapper}>
            <Text colorName="textMuted">{t.signIn.createAccount}</Text>
            <Link push href="/(auth)/SignUp">
              <Text variant="subheading" size={16}>
                {t.signIn.signupLink}
              </Text>
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
