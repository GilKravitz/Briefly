import useFormValidation from "./useFormValidation";
import useFormSubmission from "./useFormSubmission";

const useSignUp = () => {
  const { control, handleSubmit, errors, nameRef, emailRef, passwordRef } = useFormValidation();
  const { onSubmit, status, apiError } = useFormSubmission();

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
