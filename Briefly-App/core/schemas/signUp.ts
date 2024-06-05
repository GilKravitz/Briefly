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
});

export default schema;
