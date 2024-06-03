import { useMutation } from "@tanstack/react-query";
import { LoginData, LoginResponse } from "@/types";
import API from "@/core/api";
import { router } from "expo-router";
import { useCallback } from "react";
import { useAuth } from "@/core/hooks/persistentHooks";
const useFormSubmition = () => {
  const { saveToken } = useAuth();
  const onSuccessfulLogin = async (data: LoginResponse) => {
    API.Auth.setToken(data.token);
    saveToken(data.token);
    setTimeout(() => {
      router.push("/(tabs)/");
    }, 1500);
  };

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (loginData: LoginData) => API.Auth.signIn(loginData),
    onSuccess: onSuccessfulLogin,
    onError: (error) => console.log("screen", error.message),
  });

  const onSubmit = useCallback(
    (formData: LoginData) => {
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

export default useFormSubmition;
