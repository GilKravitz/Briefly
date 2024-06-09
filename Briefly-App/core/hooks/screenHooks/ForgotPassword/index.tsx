import useFormValidation from "./useFormValidation";
import useFormSubmission from "./useFormSubmition";
const useForgotPassword = () => {
  const { control, handleSubmit, errors } = useFormValidation();
  const { onSubmit, status, apiError } = useFormSubmission();
  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    status,
    apiError,
  };
};

export default useForgotPassword;
