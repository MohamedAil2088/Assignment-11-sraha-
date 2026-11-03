import { z } from "zod";
import { GenderEnum, RoleEnum, LanguageEnum } from "../../enum/index.js";
import { genralValidationFieldes, validationErrorMassage } from "../../common/utils/validation.js";

export const loginSchema = (language)=>{
    return z.strictObject({
  email: genralValidationFieldes.email(language),
  password: genralValidationFieldes.password(language),
})
}
export const login = (language)=>{
    return z.object({
    body:loginSchema(language),
    query: z.strictObject({
        language:z.enum(["ar" ,"en"]).default("ar")
    })
})
}


export const signup = (language)=>{
    return z.object({
    body: loginSchema(language).safeExtend({
  username: genralValidationFieldes.username(language), 
  phone: genralValidationFieldes.phone(language),
  confirmPassword: genralValidationFieldes.confirmPassword(language),
  DOB: genralValidationFieldes.DOB(language),
  gender: genralValidationFieldes.gender(language),
  role: z.nativeEnum(RoleEnum).optional()
}).superRefine((data, ctx)=>{
    console.log({data , ctx});
    genralValidationFieldes.matchField({original:"password", copy: "confirmPassword" , data ,ctx , language})
    if (!data.username.includes(" ")) {
        ctx.addIssue({
            code:"custom",
            path:['username'],
            message: language == "ar"
                ? validationErrorMassage[104].ar
                : validationErrorMassage[104].en
        })

    
    }
})
})
}

export const confirmEmail = (language) => {
    return z.object({
        body: z.strictObject({
            email: genralValidationFieldes.email(language),
            code: genralValidationFieldes.otp(language).optional(),
            otp: genralValidationFieldes.otp(language).optional(),
        }).refine((data) => data.code || data.otp, {
            message: language == LanguageEnum.AR ? "كود التحقق مطلوب" : "OTP code is required",
            path: ["code"]
        })
    });
};
export const resendConfirmEmail = (language) => {
    return z.object({
        body: z.strictObject({
            email: genralValidationFieldes.email(language),
        })
    })
};

export const resetForgetPasswordSchema = (language) => {
    return z.object({
        body: z.strictObject({
            email: genralValidationFieldes.email(language),
            otp: genralValidationFieldes.otp(language),
            password: genralValidationFieldes.password(language),
            confirmPassword: genralValidationFieldes.confirmPassword(language)
        }).superRefine((data,ctx) =>{
            genralValidationFieldes.matchField({original:"password", copy: "confirmPassword" , data ,ctx , language})
        })
    })
};

export const  verifyLoginOtp =  (language) =>{
    return z.object({
        body:z.strictObject({
            email: genralValidationFieldes.email(language),
            otp: genralValidationFieldes.otp(language)
        })
    })
}