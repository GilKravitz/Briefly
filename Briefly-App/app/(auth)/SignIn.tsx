import { StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import Container from "@/components/Container";
import React, { useEffect, useRef, useState } from "react";
import i18n, { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";
import { Link, router } from "expo-router";
import { Text } from "@/components/Themed";
import { useSession } from "@/core/store/sessionContext";
import API from "@/core/api";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signInSchema } from "@/core/schemas";
import { LoginResponse } from "@/types/ApiResponse";
import { LoginData } from "@/types";
import FormLoadingModal from "@/components/FormLoadingModal";

export default function SignIn() {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const session = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" }, resolver: yupResolver(signInSchema) });

  const onSubmit = (formData: LoginData) => {
    mutate(formData);
  };

  const onSuccessfulLogin = async (data: LoginResponse) => {
    await session.setToken(data.token);
    API.Auth.setToken(data.token);
    setTimeout(() => {
      router.push("/(tabs)/");
    }, 1500);
  };
  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (loginData: LoginData) => API.Auth.signIn(loginData),
    onSuccess: onSuccessfulLogin,
    onError: (error) => console.log("screen", error.message),
  });
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Container>
          <BackButton onPress={() => router.back()} />
          <Text variant="title" style={styles.title}>
            {t.signIn.welcome}
          </Text>
          <SocialButtons style={styles.socialButtons} />
          <Text variant="text" colorName="error">
            {apiError && t.signIn.loginError}
          </Text>
          <View style={styles.form}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  ref={emailRef}
                  placeholder={t.formPlaceholders.email}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                />
              )}
              name="email"
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  ref={passwordRef}
                  placeholder={t.formPlaceholders.password}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />
          </View>

          <Button onPress={handleSubmit(onSubmit)}>{t.signIn.signInBtn}</Button>

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
      <FormLoadingModal status={status} />
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
    gap: 10,
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
