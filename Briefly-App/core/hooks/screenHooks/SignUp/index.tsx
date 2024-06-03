import useFormValidation from "./useFormValidation";
import useFormSubmition from "./useFormSubmition";

const useSignUp = () => {
  const { control, handleSubmit, errors, nameRef, emailRef, passwordRef } = useFormValidation();
  const { onSubmit, status, apiError } = useFormSubmition();

  return {
    control,
    handleSubmit,
    errors,
    nameRef,
    emailRef,
    passwordRef,
    onSubmit,
    status,
    apiError,
  };
};

export default useSignUp;
