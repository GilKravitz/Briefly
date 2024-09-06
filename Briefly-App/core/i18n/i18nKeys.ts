export type I18nKeys = {
  index: {
    heading: string;
    subheading: string;
    signupBtn: string;
    signInMsg: string;
    signInLink: string;
  };
  signIn: {
    welcome: string;
    signInMutedMsg: string;
    signInBtn: string;
    forgotPassword: string;
    createAccount: string;
    signupLink: string;
    loginError: string;
  };
  signUp: {
    title: string;
    signUpMutedMsg: string;
    iHaveRead: string;
    privacyPolicy: string;
    getStarted: string;
    signupError: string;
  };
  forgotPassword: {
    title: string;
    btnText: string;
  };
  otp: {
    title: string;
    btnText: string;
    otpError: string;
  };
  setNewPassword: {
    title: string;
    btnText: string;
  };
  selectCategories: {
    title: string;
    subheading: string;
    btnText: string;
  };
  article: {
    date: {
      justNow: string;
      min: string;
      h: string;
      days: string;
    };
    category: {
      economics: string;
      sport: string;
      politics: string;
      food: string;
      tech: string;
      fashion: string;
      entertainment: string;
    };
    menu: {
      bookmark: string;
      report: string;
      externalLinks: string;
    };
    linksModal: {
      heading: string;
      subheading: string;
    };
    reportArticle: {
      title: string;
      reportReason: {
        offensive: string;
        inappropriate: string;
        spam: string;
        incorrect: string;
        other: string;
      };
      reportDetail: string;
      reportBtn: string;
    };
  };
  formErrors: {
    requiredField: string;
    invalidEmail: string;
    invalidPassword: string;
    minPassLen: string;
    maxPassLen: string;
    passwordMatch: string;
  };
  formPlaceholders: {
    email: string;
    password: string;
    passwordConfirmation: string;
    name: string;
    otp: string;
  };
  settings: {
    title: string;
    fontSize: string;
    updateInterests: string;
    selectCategories: string;
  };
  bookmarks: {
    title: string;
    noBookmarks: string;
  };
};
