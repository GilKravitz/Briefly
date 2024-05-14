import { StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import Container from "@/components/Container";
import React, { useEffect, useRef, useState } from "react";
import i18n, { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Checkbox from "expo-checkbox";
import Button from "@/components/pressable/Button";
import { Link, router } from "expo-router";
import { Text } from "@/components/Themed";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
// import schema from "@/core/schemas/signUp";
import { signUpSchema } from "@/core/schemas";

export default function SignUp() {
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", privacyPolicy: false },
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    if (errors.email) console.log(errors.email);
  }, [errors]);

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Container>
          <BackButton onPress={() => router.back()} />
          <Text variant="title" style={styles.title}>
            {t.signUp.title}
          </Text>
          <SocialButtons style={styles.socialButtons} />
          <View style={styles.form}>
            {/* Name */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  ref={nameRef}
                  placeholder={t.formPlaceholders.name}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.name?.message}
                />
              )}
            />
            {/* Email */}
            <Controller
              name="email"
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
            />
            {/* Password */}
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
            {/* Privacy Policy */}
            <View>
              <View row style={{ justifyContent: "space-between", paddingVertical: 5, width: "100%" }}>
                <View row style={styles.privacyPolicyWrapper}>
                  <Text colorName={errors.privacyPolicy ? "error" : "textMuted"}>{t.signUp.iHaveRead}</Text>
                  <Link push href="/(auth)/PrivacyPolicy">
                    <Text variant="subheading" size={16}>
                      {t.signUp.privacyPolicy}
                    </Text>
                  </Link>
                </View>
                <Controller
                  name="privacyPolicy"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => <Checkbox onValueChange={onChange} value={value} />}
                />
              </View>
            </View>
          </View>

          <Button onPress={handleSubmit(onSubmit)}>{t.signUp.getStarted}</Button>
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
    gap: 10,
    marginVertical: 20,
  },
  privacyPolicyWrapper: {
    gap: 5,
  },
});
