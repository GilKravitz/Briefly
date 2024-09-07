import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setNewPasswordSchema } from "@/core/schemas";

const useFormValidation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", passwordConfirmation: "" },
    resolver: yupResolver(setNewPasswordSchema),
  });

  return {
    control,
    handleSubmit,
    errors,
  };
};

export default useFormValidation;
