import { useState } from "react";
import useFormSubmission from "./useFormSubmission";
import useOtpInput from "./useOtpInput";
import { t } from "@/core/i18n";
import { set } from "react-hook-form";
import { OtpData } from "@/types";

const useOtp = () => {
  const { apiError, email, mutate, status } = useFormSubmission();
  const { otp, handleOTPChange, inputRefs, focusedIndex, setFocusedIndex } = useOtpInput(4);

  const [error, setError] = useState<string>("");

  const handlePress = () => {
    const otpString = otp.join("");
    const otpData: OtpData = { email: email, otp: otpString };
    console.log("otpData", otpData);
    if (otpString.length === 4) mutate(otpData);
    else setError(t.otp.otpError);
  };
  return { otp, handleOTPChange, inputRefs, error, handlePress, status, apiError, focusedIndex, setFocusedIndex };
};

export default useOtp;
