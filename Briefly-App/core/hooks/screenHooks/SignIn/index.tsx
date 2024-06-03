import useFormValidation from "./useFormValidation";
import useFormSubmission from "./useFormSubmission";

const useSignIn = () => {
  const { control, handleSubmit, errors, emailRef, passwordRef } = useFormValidation();
  const { onSubmit, status, apiError } = useFormSubmission();

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
