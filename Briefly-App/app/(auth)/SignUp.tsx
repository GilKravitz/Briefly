import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import { View } from "@/components/Themed";
import Container from "@/components/Container";
import React from "react";
import { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton2";
import SocialButtons from "@/components/SocialButtons";
import Input from "@/components/Input";
import Checkbox from "expo-checkbox";
import Button from "@/components/pressable/Button";
import { Link, router } from "expo-router";
import { Text } from "@/components/Themed";
import useSignUp from "@/core/hooks/screenHooks/SignUp";
import { Controller } from "react-hook-form";
import FormLoadingModal from "@/components/FormLoadingModal";
import LottieView from "lottie-react-native";
import { Image } from "expo-image";

export default function SignUp() {
  const { control, handleSubmit, errors, nameRef, emailRef, passwordRef, onSubmit, status, apiError } = useSignUp();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Container>
          <BackButton variant="dark" />
          <Text variant="title" style={styles.title}>
            {t.signUp.title}
          </Text>
          {/* <SocialButtons style={styles.socialButtons} /> */}
          <LottieView
            speed={0.7}
            enableMergePathsAndroidForKitKatAndAbove
            autoPlay
            style={styles.lottie}
            source={require("../../assets/lottie/signup.json")}
          />
          <Text variant="text" colorName="error">
            {apiError && t.signUp.signupError}
          </Text>
          <View style={styles.form}>
            {/* Name */}
            <Controller
              name="userName"
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
                  error={errors.userName?.message}
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
  privacyPolicyWrapper: {
    gap: 5,
  },
  lottie: {
    width: "100%",
    height: 200,
    marginTop: 40,
  },
});
