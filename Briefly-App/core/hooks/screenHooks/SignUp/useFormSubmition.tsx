import { useMutation } from "@tanstack/react-query";
import { RegisterData, RegisterResponse } from "@/types";
import API from "@/core/api";
import { router } from "expo-router";
import { useCallback } from "react";
import { useAuth } from "@/core/hooks/persistentHooks";

const useFormSubmition = () => {
  const { saveToken } = useAuth();
  const onSuccessfulRegister = async (data: RegisterResponse) => {
    API.Auth.setToken(data.token);
    saveToken(data.token);
    setTimeout(() => {
      router.push("/(app)/SelectTopics");
    }, 1500);
  };

  const {
    mutate,
    status,
    error: apiError,
  } = useMutation({
    mutationFn: (registerData: RegisterData) => API.Auth.signUp(registerData),
    onSuccess: onSuccessfulRegister,
    onError: (error) => console.log("screen", error.message),
  });

  const onSubmit = useCallback(
    (formData: RegisterData) => {
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
