import { LanguageEnum } from "./security.enum.js";

export const EmailSubjectEnum = {
    CONFIRM_EMAIL: "Confirm_Email",
    FORGET_PASSWORD: "Forget_Password",
    TWO_STEP_VERIFICATION: "Two_Step_Verification"
};

export const EmailSubjectMap = {
    [LanguageEnum.EN]: {
        [EmailSubjectEnum.CONFIRM_EMAIL]: "Confirm_Email",
        [EmailSubjectEnum.FORGET_PASSWORD]: "Forget_Password",
        [EmailSubjectEnum.TWO_STEP_VERIFICATION]: "Two_Step_Verification"
    },
    [LanguageEnum.AR]: {
        [EmailSubjectEnum.CONFIRM_EMAIL]: "تأكيد البريد الإلكتروني",
        [EmailSubjectEnum.FORGET_PASSWORD]: "إعادة تعيين كلمة المرور",
        [EmailSubjectEnum.TWO_STEP_VERIFICATION]: "رمز التحقق بخطوتين لتسجيل الدخول"
    }
};
