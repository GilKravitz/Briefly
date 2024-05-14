import * as yup from "yup";
import i18n from "@/core/i18n";

// email regex
let EMAIL_REGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// password regex to include at least one number, one lowercase and one uppercase letter, and at least eight characters
let PASSWORD_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

const schema = yup.object().shape({
  name: yup.string().required(() => i18n.t("formErrors.requiredField")),
  email: yup
    .string()
    .required(() => i18n.t("formErrors.requiredField"))
    .matches(EMAIL_REGX, () => i18n.t("formErrors.invalidEmail")),
  password: yup
    .string()
    .required(() => i18n.t("formErrors.requiredField"))
    .min(8, () => i18n.t("formErrors.minPassLen", { min: 8 }))
    .max(20, () => i18n.t("formErrors.maxPassLen", { max: 20 }))
    .matches(PASSWORD_REGX, () => i18n.t("formErrors.invalidPassword")),
  privacyPolicy: yup
    .boolean()
    .oneOf([true], () => i18n.t("formErrors.requiredField"))
    .required(() => i18n.t("formErrors.requiredField")),
  otp: yup
    .string()
    .required(() => i18n.t("formErrors.requiredField"))
    .min(4, () => i18n.t("formErrors.minOtpLen", { min: 4 })),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], () => i18n.t("formErrors.passwordMatch"))
    .required(() => i18n.t("formErrors.requiredField")),
});

const signInSchema = schema.pick(["email", "password"]);
const signUpSchema = schema.pick(["name", "email", "password", "privacyPolicy"]);
const forgotPasswordSchema = schema.pick(["email"]);
const otpSchema = schema.pick(["otp"]);
const setNewPasswordSchema = schema.pick(["password", "passwordConfirmation"]);

export { signInSchema, signUpSchema, otpSchema, forgotPasswordSchema, setNewPasswordSchema };
