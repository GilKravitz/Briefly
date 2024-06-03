import useFormValidation from "./useFormValidation";
import useFormSubmition from "./useFormSubmition";

const useSignIn = () => {
  const { control, handleSubmit, errors, emailRef, passwordRef } = useFormValidation();
  const { onSubmit, status, apiError } = useFormSubmition();

  return {
    control,
    handleSubmit,
    errors,
    emailRef,
    passwordRef,
    onSubmit,
    apiError,
    status,
  };
};

export default useSignIn;
