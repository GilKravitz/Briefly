import { Keyboard, StyleSheet, TextInput } from "react-native";
import Container from "@/components/Container";
import React, { useEffect, useRef, useState } from "react";
import BackButton from "@/components/pressable/BackButton2";
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
import useOtp from "@/core/hooks/screenHooks/Otp";
const Otp = () => {
  const { apiError, error, focusedIndex, setFocusedIndex, inputRefs, otp, handleOTPChange, handlePress, status } =
    useOtp();
  return (
    <Container>
      <BackButton variant="dark" />
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
