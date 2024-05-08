// // implement general form validation hook for my forms in the app
// // the form validation hook should be able to handle the following:
// // - form fields validation
// // - form submission
// // - form submission errors
// // - form submission success
// // - form submission loading state

// import { useState } from "react";

// type FormValidationProps = {
//     initialState: Record<string, any>;

// };
// const useFormValidation = (initialState, validate, onSubmit) => {
//     const [values, setValues] = useState(initialState);
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);

//     const handleChange = (name, value) => {
//         setValues({
//         ...values,
//         [name]: value,
//         });
//     };

//     const handleSubmit = async () => {
//         const validationErrors = validate(values);
//         setErrors(validationErrors);
//         if (Object.keys(validationErrors).length > 0) {
//         return;
//         }

//         setLoading(true);
//         try {
//         await onSubmit(values);
//         setSuccess(true);
//         } catch (error) {
//         setSuccess(false);
//         } finally {
//         setLoading(false);
//         }
//     };

//     return {
//         values,
//         errors,
//         loading,
//         success,
//         handleChange,
//         handleSubmit,
//     };
// };
