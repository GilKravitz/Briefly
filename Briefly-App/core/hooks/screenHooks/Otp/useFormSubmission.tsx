import API from "@/core/api";
import { OtpData, OtpResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { t } from "@/core/i18n";

const useFormSubmission = () => {
  const { email } = useGlobalSearchParams() as { email: string };

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (otpData: OtpData) => API.Auth.checkOTP(otpData),
    onSuccess: (data: OtpResponse) => {
      console.log("otpResponse:", data);
      setTimeout(() => {
        router.push({
          pathname: "/(auth)/SetNewPassword",
          params: { email: email, token: data.token },
        });
      }, 1500);
    },
    onError: (error) => console.log("otpError:", error.message),
  });

  return { status, apiError, email, mutate };
};

export default useFormSubmission;
