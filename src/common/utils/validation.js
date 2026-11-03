import { z } from "zod";
import { GenderEnum } from "../../enum/user.gender.js";
import { LanguageEnum } from "../../enum/security.enum.js";

export const validationErrorMassage = {
  100: {
    ar: "قيمة غير صحيحة",
    en: "Invalid value"
  },
  101: {
    ar: "هذا الحقل مطلوب",
    en: "This field is required"
  },
  102: {
    ar: "عفوا، الحد الأدنى لطول اسم المستخدم حرفان",
    en: "Minimum username length is 2 characters"
  },
  103: {
    ar: "الحد الأقصى لطول اسم المستخدم 30 حرفًا",
    en: "Maximum username length is 30 characters"
  },
  104: {
    ar: "اسم المستخدم يجب أن يتكون من اسمين",
    en: "Username must contain two parts"
  },
  105: {
    ar: "البريد الإلكتروني غير صحيح",
    en: "Invalid email address"
  },
  106: {
    ar: "كلمة المرور قصيرة جدًا",
    en: "Password is too short"
  },
  107: {
    ar: "كلمة المرور يجب أن تحتوي على حرف كبير",
    en: "Password must contain an uppercase letter"
  },
  108: {
    ar: "كلمة المرور يجب أن تحتوي على حرف صغير",
    en: "Password must contain a lowercase letter"
  },
  109: {
    ar: "كلمة المرور يجب أن تحتوي على رقم",
    en: "Password must contain a number"
  },
  110: {
    ar: "كلمة المرور وتأكيدها غير متطابقين",
    en: "Password and confirm password do not match"
  },
  111: {
    ar: "رقم الهاتف غير صحيح",
    en: "Invalid phone number"
  },
  112: {
    ar: "تاريخ الميلاد غير صحيح",
    en: "Invalid date of birth"
  },
  113: {
    ar: "النوع المحدد غير صحيح",
    en: "Invalid gender"
  },
  114: {
    ar: "اللغة المحددة غير مدعومة",
    en: "Unsupported language"
  },
  115: {
    ar: "قيمة الحقل أقصر من الحد المسموح",
    en: "Value is shorter than the minimum allowed length"
  },
  116: {
    ar: "قيمة الحقل أطول من الحد المسموح",
    en: "Value exceeds the maximum allowed length"
  },
  117: {
    ar: "صيغة البيانات غير صحيحة",
    en: "Invalid data format"
  },
  118: {
    ar: "هذا الحقل غير مسموح به",
    en: "Unrecognized field"
  },
  119: {
    ar: "القيمة يجب أن تكون رقمًا",
    en: "Value must be a number"
  },
  120: {
    ar: "القيمة يجب أن تكون نصًا",
    en: "Value must be a string"
  },
  121: {
    ar: "القيمة يجب أن تكون منطقية",
    en: "Value must be a boolean"
  },
  122: {
    ar: "القيمة المحددة غير موجودة ضمن الاختيارات المسموحة",
    en: "Value is not one of the allowed options"
  },
  123: {
    ar: "البيانات المدخلة غير صحيحة",
    en: "Invalid input data"
  },
  124: {
    ar: "يجب إدخال كلمة المرور",
    en: "Password is required"
  },
  125: {
    ar: "يجب تأكيد كلمة المرور",
    en: "Confirm password is required"
  },
  126: {
    ar: "يجب إدخال البريد الإلكتروني",
    en: "Email is required"
  },
  127: {
    ar: "يجب إدخال اسم المستخدم",
    en: "Username is required"
  },
  128: {
    ar: "يجب إدخال رقم الهاتف",
    en: "Phone number is required"
  },
  129: {
    ar: "تاريخ الميلاد يجب أن يكون في الماضي",
    en: "Date of birth must be in the past"
  },
  130: {
    ar: "${original} و ${copy} غير متطابقين",
    en: "${original} and ${copy} do not match"
}

};


const matchField = ({ original, copy, data, ctx, language }) => {
  if (data[original] != data[copy]) {
    ctx.addIssue({
      code: "custom",
      path: [copy],
      message:
        language === LanguageEnum.AR
          ? validationErrorMassage[130].ar
            .replace("${original}", original)
            .replace("${copy}", copy)
          : validationErrorMassage[130].en
            .replace("${original}", original)
            .replace("${copy}", copy)
    });
  }
};

export const genralValidationFieldes = {
  email: (language) => z.email({
    message: language == LanguageEnum.AR
      ? validationErrorMassage[105].ar
      : validationErrorMassage[105].en,
  }),
  // password: (language) => z.string().min(6, {
  //   message: language == LanguageEnum.AR
  //     ? validationErrorMassage[106].ar
  //     : validationErrorMassage[106].en,
  // }).max(16, {
  //   message: language == LanguageEnum.AR
  //     ? validationErrorMassage[116].ar
  //     : validationErrorMassage[116].en,
  // }),
    password: (language) => z.string().min(6, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[106].ar
      : validationErrorMassage[106].en,
  }).max(16, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[116].ar
      : validationErrorMassage[116].en,
  }).regex(/[A-Z]/, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[107].ar
      : validationErrorMassage[107].en,
  }).regex(/[a-z]/, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[108].ar
      : validationErrorMassage[108].en,
  }).regex(/[0-9]/, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[109].ar
      : validationErrorMassage[109].en,
  }),

  username: (language) =>
    z.string().min(2, {
      message:
        language == LanguageEnum.AR
          ? validationErrorMassage[102].ar
          : validationErrorMassage[102].en,
    }),
  phone: (language) => z.e164({
    message: language == LanguageEnum.AR
      ? validationErrorMassage[111].ar
      : validationErrorMassage[111].en,
  }),
  confirmPassword: (language) => z.string().min(6, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[106].ar
      : validationErrorMassage[106].en,
  }).max(16, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[116].ar
      : validationErrorMassage[116].en,
  }),
  DOB: (language) => z.coerce.date({
    message: language == LanguageEnum.AR
      ? validationErrorMassage[112].ar
      : validationErrorMassage[112].en,
  }),
  gender: (language) => z.enum(GenderEnum, {
    message: language == LanguageEnum.AR
      ? validationErrorMassage[113].ar
      : validationErrorMassage[113].en,
  }),
  otp: (language) => z.string().regex(/^\d{6}$/, {
    message: language == LanguageEnum.AR
      ? "كود التحقق يجب أن يتكون من 6 أرقام"
      : "OTP code must be 6 digits"
  }),
  matchField,
};
