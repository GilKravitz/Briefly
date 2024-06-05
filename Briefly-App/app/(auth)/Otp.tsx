import { Keyboard, StyleSheet, TextInput } from "react-native";
import Container from "@/components/Container";
import React, { useEffect, useRef, useState } from "react";
import BackButton from "@/components/pressable/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "@/core/i18n";
import LottieView from "lottie-react-native";
import { View, Text } from "@/components/Themed";
import Input from "@/components/Input";
import Button from "@/components/pressable/Button";
import FormLoadingModal from "@/components/FormLoadingModal";
import { useMutation } from "@tanstack/react-query";
import API from "@/core/api";
import { OtpData, OtpResponse } from "@/types";

const Otp = () => {
  // create ref for 4 text inputs for OTP
  const { email } = useLocalSearchParams() as { email: string };
  const inputRefs = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (otpData: OtpData) => API.Auth.checkOTP(otpData),
    onSuccess: (data: OtpResponse) => {
      setTimeout(() => {
        router.push({
          pathname: "/(auth)/SetNewPassword",
          params: { email: email, token: data.token },
        });
      }, 1500);
    },
    onError: (error) => console.log("screen", error.message),
  });

  const handleOTPChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      setFocusedIndex(index + 1);
    } else if (text && index === 3) {
      handleKeyboardDismiss();
    }

    //delete
    if (text === "" && index > 0) {
      setFocusedIndex(index - 1);
    } else if (text === "" && index === 0) {
      handleKeyboardDismiss();
    }
  };

  useEffect(() => {
    if (focusedIndex > -1 && focusedIndex < 4) {
      inputRefs[focusedIndex].current?.focus();
    }
  }, [focusedIndex]);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
    setFocusedIndex(-1);
  };

  const handlePress = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) mutate({ email: email, otp: otpString });
    else setError(t.otp.otpError);
  };
  return (
    <Container>
      <BackButton onPress={() => router.back()} />
      <Text variant="title">{t.otp.title}</Text>
      <LottieView autoPlay style={styles.lottie} source={require("../../assets/lottie/otp.json")} />
      {(apiError || error) && (
        <Text variant="text" colorName="error">
          {t.otp.otpError}
        </Text>
      )}
      <View style={styles.formContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={`OTP_INPUT${index}`}>
            <Input
              style={[styles.input, focusedIndex === index && styles.focused]}
              placeholder="0"
              ref={inputRefs[index]}
              value={otp[index]}
              maxLength={1}
              keyboardType="numeric"
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleOTPChange("", index);
                } else if (nativeEvent.key >= "0" && nativeEvent.key <= "9") {
                  handleOTPChange(nativeEvent.key, index);
                }
              }}
              onFocus={() => setFocusedIndex(index)}
            />
          </View>
        ))}
      </View>
      <Button onPress={handlePress}>{t.otp.btnText}</Button>
      <FormLoadingModal status={status} />
    </Container>
  );
};

export default Otp;

const styles = StyleSheet.create({
  lottie: {
    width: "100%",
    height: 200,
    marginTop: 40,
  },
  formContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginVertical: 40,
  },
  input: {
    width: 64,
    height: 64,
    paddingHorizontal: 0,
    textAlign: "center",
  },
  focused: {
    // borderColor: Colors.primary,
    borderWidth: 2,
  },
});
