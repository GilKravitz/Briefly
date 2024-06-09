import useFormSubmission from "./useFormSubmission";
import useFormValidation from "./useFormValidation";
const useSetNewPassword = () => {
  const { onSubmit, status, apiError } = useFormSubmission();
  const { control, handleSubmit, errors } = useFormValidation();
  return {
    onSubmit,
    status,
    apiError,
    control,
    handleSubmit,
    errors,
  };
};

export default useSetNewPassword;
