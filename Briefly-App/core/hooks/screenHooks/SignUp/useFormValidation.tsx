import { useRef } from "react";
import { TextInput } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/core/schemas";

const useFormValidation = () => {
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { userName: "", email: "", password: "", privacyPolicy: false },
    resolver: yupResolver(signUpSchema),
  });

  return {
    control,
    handleSubmit,
    errors,
    nameRef,
    emailRef,
    passwordRef,
  };
};

export default useFormValidation;
