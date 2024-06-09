import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/core/schemas";

const useFormValidation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(forgotPasswordSchema),
  });

  return {
    control,
    handleSubmit,
    errors,
  };
};

export default useFormValidation;
