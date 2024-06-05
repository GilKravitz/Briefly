import { I18nKeys } from "./i18nKeys";
const en: I18nKeys = {
  index: {
    heading: "Concise.",
    subheading: "Get Your Costum Tailored\nNews-Feed",
    signupBtn: "SIGN UP",
    signInMsg: "Already have an account?",
    signInLink: "SIGN IN",
  },
  signIn: {
    welcome: "Welcome Back!",
    signInMutedMsg: "Or Sign In With Email",
    signInBtn: "SIGN IN",
    forgotPassword: "Forgot Password?",
    createAccount: "Dont have an account?",
    signupLink: "SIGN UP",
    loginError: "Invalid Email or Password",
  },
  signUp: {
    title: "Create Your Account",
    signUpMutedMsg: "Or Sign Up With Email",
    iHaveRead: "I have read the",
    privacyPolicy: "Privacy Policy",
    getStarted: "GET STARTED",
    signupError: "Invalid Email or name or Password",
  },
  forgotPassword: {
    title: "Reset Password",
    btnText: "SEND CODE TO EMAIL",
  },
  otp: {
    title: "Enter Code",
    btnText: "CONFIRM",
    otpError: "Invalid OTP",
  },
  setNewPassword: {
    title: "Set New Password",
    btnText: "SET PASSWORD",
  },
  selectCategories: {
    title: "Get Your Custom Feed",
    subheading: "Select Categories You Are Interested In",
    btnText: "NEXT",
  },
  article: {
    date: {
      justNow: "Now",
      min: "min",
      h: "h",
      days: "days",
    },
    category: {
      economics: "Economics",
      sport: "Sport",
      politics: "Politics",
      food: "Food",
      tech: "Tech",
      fashion: "Fashion",
      entertainment: "Entertainment",
    },
    menu: {
      bookmark: "Bookmark",
      report: "Report",
    },
    linksModal: {
      heading: "Found It Interesting?",
      subheading: "Tap Here To Read The Full Article:",
    },
    reportArticle: {
      title: "Report Article",
      reportReason: {
        spam: "Spam",
        inappropriate: "Inappropriate",
        incorrect: "Incorrect - The article contains incorrect information",
        offensive: "Offensive - The article contains offensive content",
        other: "Other",
      },
      reportDetail: "Please describe the reason for reporting this article",
      reportBtn: "Submit Report",
    },
  },
  formErrors: {
    requiredField: "Required Field",
    invalidEmail: "Invalid Email",
    invalidPassword: "Password must contain [A-Z], [a-z], [0-9], symobl and at least 8 characters",
    maxPassLen: "Password must be less than {{max}} characters",
    minPassLen: "Password must be at least {{min}} characters",
    passwordMatch: "Passwords must match",
  },
  formPlaceholders: {
    name: "Name",
    email: "Email",
    password: "Password",
    passwordConfirmation: "Confirm Password",
    otp: "0",
  },
};

export default en;
