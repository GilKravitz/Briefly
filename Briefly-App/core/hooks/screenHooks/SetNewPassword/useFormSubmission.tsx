import { useMutation } from "@tanstack/react-query";
import { NewPasswordData } from "@/types";
import API from "@/core/api";
import { router, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/core/hooks/persistentHooks";
import { setNewPasswordSchema } from "@/core/schemas";

const useFormSubmission = () => {
  const { email, token } = useGlobalSearchParams() as { email: string; token: string };

  const onSucess = async (data: any) => {
    setTimeout(() => {
      router.replace("/(auth)/SignIn");
    }, 1500);
  };

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (newPasswordData: NewPasswordData) => API.Auth.setNewpassword(newPasswordData),
    onSuccess: onSucess,
    onError: (error) => console.log("screen", error),
  });

  const onSubmit = useCallback(
    (formData: any) => {
      const newPasswordData: NewPasswordData = { email, token, newPassword: formData.password };
      console.log("newPasswordData", newPasswordData);
      mutate(newPasswordData);
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
