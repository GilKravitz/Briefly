import { I18nKeys } from "./i18nKeys";
const he: I18nKeys = {
  index: {
    heading: "תמציתי.",
    subheading: "קבל/י את עדכוני החדשות שלך\n בהתאמה אישית",
    signupBtn: "הרשמה",
    signInMsg: "כבר יש לך חשבון?",
    signInLink: "התחברות",
  },
  signIn: {
    welcome: "ברוך הבא!",
    signInMutedMsg: "או התחבר/י עם דואר אלקטרוני",
    signInBtn: "כניסה",
    forgotPassword: "שכחת סיסמה?",
    createAccount: "אין לך חשבון?",
    signupLink: "הרשמה",
    loginError: "דואר אלקטרוני או סיסמה לא נכונים",
  },
  signUp: {
    title: "הירשם",
    signUpMutedMsg: "או הרשם עם דואר אלקטרוני",
    signInBtn: "התחבר",
    iHaveRead: "קראתי ואני מסכים ל",
    privacyPolicy: "מדיניות פרטיות",
    getStarted: "התחל",
    signupError: "דואר אלקטרוני או שם או סיסמה לא נכונים",
  },
  forgotPassword: {
    title: "שכחת סיסמה",
    btnText: "שלח",
  },
  otp: {
    title: "הזן קוד",
    btnText: "אישור",
  },
  setNewPassword: {
    title: "הגדר סיסמה חדשה",
    btnText: "הגדר",
  },
  selectTopics: {
    title: "קבל/י את העדכונים שלך",
    subheading: "בחר/י נושאים שמעניינים אותך",
    btnText: "המשך",
  },
  article: {
    date: {
      justNow: "עכשיו",
      min: "דק'",
      h: "ש'",
      days: "ימים",
    },
    category: {
      economics: "כלכלה",
      sport: "ספורט",
      politics: "פוליטיקה",
      food: "אוכל",
      tech: "טכנולוגיה",
    },
    menu: {
      bookmark: "שמור",
      report: "דווח",
    },
    linksModal: {
      heading: "מצאת את הכתבה מעניינת ?",
      subheading: "ניתן לקרוא פה את הכתבה המלאה :",
    },
    reportArticle: {
      title: "דווח על כתבה",
      reportReason: {
        inappropriate: "מכיל תוכן לא הולם",
        spam: "ספאם",
        offensive: "מכיל תוכן פוגעני",
        incorrect: "מכיל מידע שגוי",
        other: "אחר",
      },
      reportDetail: "סיבה לדיווח",
      reportBtn: "שלח",
    },
  },
  formErrors: {
    requiredField: "שדה חובה",
    invalidEmail: "דואר אלקטרוני לא תקין",
    invalidPassword: "סיסמה חייבת להכיל [a-z], [A-Z], [0-9], תו מיוחד ולפחות 8 תווים",
    maxPassLen: "סיסמה חייבת להכיל פחות מ {{max}} תווים",
    minPassLen: `סיסמה חייבת להכיל לפחות {{min}} תווים`,
  },
};

// create type for the i18n keys
export default he;