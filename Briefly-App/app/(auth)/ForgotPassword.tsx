import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import Container from "@/components/Container";
import React from "react";
import { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton2";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";
import { Controller } from "react-hook-form";
import FormLoadingModal from "@/components/FormLoadingModal";
import useForgotPassword from "@/core/hooks/screenHooks/ForgotPassword";
const ForgotPassword = () => {
  const { control, errors, onSubmit, status, handleSubmit } = useForgotPassword();

  return (
    <Container>
      <BackButton variant="dark" />
      <Text variant="title">{t.forgotPassword.title}</Text>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/forgotPassword.json")} />
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t.formPlaceholders.email}
            returnKeyType="next"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
          />
        )}
      />

      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
        {t.forgotPassword.btnText}
      </Button>
      <FormLoadingModal status={status} />
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
