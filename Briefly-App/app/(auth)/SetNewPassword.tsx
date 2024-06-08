import { Keyboard, StyleSheet, TextInput } from "react-native";
import { View, Text } from "@/components/Themed";
import Container from "@/components/Container";
import React, { useEffect, useRef, useState } from "react";
import BackButton from "@/components/pressable/BackButton2";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "@/core/i18n";
import LottieView from "lottie-react-native";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { setNewPasswordSchema } from "@/core/schemas";
import useSetNewPassword from "@/core/hooks/screenHooks/SetNewPassword";
import FormLoadingModal from "@/components/FormLoadingModal";

const SetNewPassword = () => {
  const confirmPasswordRef = useRef<TextInput>(null);
  const { control, errors, handleSubmit, onSubmit, status } = useSetNewPassword();

  return (
    <Container>
      <BackButton variant="dark" />
      <Text variant="title">{t.setNewPassword.title}</Text>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/setNewPassword.json")} />
      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t.formPlaceholders.password}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            returnKeyType="next"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        name="passwordConfirmation"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            ref={confirmPasswordRef}
            returnKeyType="done"
            style={styles.passwordConfirmation}
            placeholder={t.formPlaceholders.passwordConfirmation}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.passwordConfirmation?.message}
          />
        )}
      />
      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
        {t.setNewPassword.btnText}
      </Button>
      <FormLoadingModal status={status} />
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
  passwordConfirmation: {
    marginTop: 20,
  },
  // passwordInput: {
  //   marginBottom: 20,
  // },
});
