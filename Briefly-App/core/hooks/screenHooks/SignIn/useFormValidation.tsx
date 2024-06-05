import { useRef } from "react";
import { TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/core/schemas";
import { LoginData } from "@/types";

const useFormValidation = () => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  return {
    control,
    handleSubmit,
    errors,
    emailRef,
    passwordRef,
  };
};

export default useFormValidation;
