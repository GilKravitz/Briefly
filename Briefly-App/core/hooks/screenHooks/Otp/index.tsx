import { useState } from "react";
import useFormSubmission from "./useFormSubmission";
import useOtpInput from "./useOtpInput";
import { t } from "@/core/i18n";
import { set } from "react-hook-form";

const useOtp = () => {
  const { apiError, email, mutate, status } = useFormSubmission();
  const { otp, handleOTPChange, inputRefs, focusedIndex, setFocusedIndex } = useOtpInput(4);

  const [error, setError] = useState<string>("");

  const handlePress = () => {
    const otpString = otp.join("");
    console.log("otp", email, otpString);
    const myMail = "gilkravitz1@gmail.com";
    if (otpString.length === 4) mutate({ email: myMail, otp: otpString });
    else setError(t.otp.otpError);
  };
  return { otp, handleOTPChange, inputRefs, error, handlePress, status, apiError, focusedIndex, setFocusedIndex };
};

export default useOtp;
