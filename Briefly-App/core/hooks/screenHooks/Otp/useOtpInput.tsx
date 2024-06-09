import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import { Keyboard, TextInput } from "react-native";

const useOtpInput = (otpLength: number) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = Array.from({ length: otpLength }, () => useRef<TextInput>(null));

  const handleOTPChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < otpLength - 1) {
      setFocusedIndex(index + 1);
    } else if (text && index === otpLength - 1) {
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
    if (focusedIndex > -1 && focusedIndex < otpLength) {
      inputRefs[focusedIndex].current?.focus();
    }
  }, [focusedIndex]);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
    setFocusedIndex(-1);
  };

  return { otp, handleOTPChange, inputRefs, focusedIndex, setFocusedIndex };
};

export default useOtpInput;
