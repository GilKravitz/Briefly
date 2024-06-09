import { useMutation } from "@tanstack/react-query";
import { FotgotPasswordData, OtpResponse } from "@/types";
import API from "@/core/api";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useAuth } from "@/core/hooks/persistentHooks";

const useFormSubmission = () => {
  const [email, setEmail] = useState<string>("");

  const onSucess = async (data: any) => {
    setTimeout(() => {
      router.push({
        pathname: "/(auth)/Otp",
        params: { email: email },
      });
    }, 1500);
  };

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (forgotPasswordData: FotgotPasswordData) => API.Auth.forgotPassword(forgotPasswordData),
    onSuccess: onSucess,
    onError: (error) => console.log("screen", error.message),
  });

  const onSubmit = useCallback(
    (formData: FotgotPasswordData) => {
      setEmail(formData.email);
      mutate(formData);
    },
    [mutate]
  );

  return {
    onSubmit,
    status,
    apiError,
  };
};

export default useFormSubmission;
