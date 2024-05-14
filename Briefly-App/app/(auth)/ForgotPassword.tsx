import { Keyboard, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import Container from "@/components/Container";
import React, { useEffect } from "react";
import { t } from "@/core/i18n";
import BackButton from "@/components/pressable/BackButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { forgotPasswordSchema } from "@/core/schemas";

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" }, resolver: yupResolver(forgotPasswordSchema) });

  useEffect(() => {
    if (errors.email) console.log(errors.email);
  }, [errors]);

  const onSubmit = (data: { email: string }) => {
    console.log(data);
    router.push("/(auth)/Otp");
  };

  return (
    <Container>
      <BackButton onPress={() => router.back()} />
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
