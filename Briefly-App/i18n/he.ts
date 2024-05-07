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
      reportReasonLabel: "אנא ספק את הסיבה לדיווח על הכתבה",
      reportDetail: "סיבה לדיווח",
      reportBtn: "שלח",
    },
  },
};

// create type for the i18n keys
export default he;
