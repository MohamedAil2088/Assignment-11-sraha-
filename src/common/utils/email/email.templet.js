import { EmailSubjectEnum, LanguageEnum } from "../../../enum/index.js";

export const templates = {
    [EmailSubjectEnum.CONFIRM_EMAIL]: {
        [LanguageEnum.EN]: (data) => `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style type="text/css">
        body { background-color: #88BDBF; margin: 0px; font-family: sans-serif; }
    </style>
</head>
<body style="margin:0px;">
    <table border="0" width="50%" style="margin:auto; padding:30px; background-color: #F3F3F3; border:1px solid #630E2B;">
        <tr>
            <td style="text-align: center; padding: 20px 0;">
                <h2 style="color: #630E2B; margin: 0 0 10px;">${data.title || "Confirm Email"}</h2>
                <p style="color: #444; font-size: 15px;">Copy the code below to verify your email address:</p>
                <div style="margin: 20px auto; padding: 12px 20px; background-color: #fff; border: 2px dashed #88BDBF; width: max-content; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #630E2B;">
                    ${data.code}
                </div>
                <p style="color: #888; font-size: 13px;">This code will expire in 10 minutes.</p>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding-top: 15px; border-top: 1px solid #ddd;">
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-facebook"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-twitter"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-instagram"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-linkedin"></i></a>
            </td>
        </tr>
    </table>
</body>
</html>`,

        [LanguageEnum.AR]: (data) => `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style type="text/css">
        body { background-color: #88BDBF; margin: 0px; font-family: Tahoma, Arial, sans-serif; }
    </style>
</head>
<body style="margin:0px;" dir="rtl">
    <table border="0" width="50%" style="margin:auto; padding:30px; background-color: #F3F3F3; border:1px solid #630E2B;">
        <tr>
            <td style="text-align: center; padding: 20px 0;">
                <h2 style="color: #630E2B; margin: 0 0 10px;">${data.title || "تأكيد البريد الإلكتروني"}</h2>
                <p style="color: #444; font-size: 15px;">انسخ الرمز أدناه لتأكيد بريدك الإلكتروني:</p>
                <div style="margin: 20px auto; padding: 12px 20px; background-color: #fff; border: 2px dashed #88BDBF; width: max-content; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #630E2B;">
                    ${data.code}
                </div>
                <p style="color: #888; font-size: 13px;">صلاحية هذا الرمز تنتهي خلال 10 دقائق.</p>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding-top: 15px; border-top: 1px solid #ddd;">
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-facebook"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-twitter"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-instagram"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-linkedin"></i></a>
            </td>
        </tr>
    </table>
</body>
</html>`
    },


    [EmailSubjectEnum.FORGET_PASSWORD]: {
        [LanguageEnum.EN]: (data) => `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style type="text/css">
        body { background-color: #88BDBF; margin: 0px; font-family: sans-serif; }
    </style>
</head>
<body style="margin:0px;">
    <table border="0" width="50%" style="margin:auto; padding:30px; background-color: #F3F3F3; border:1px solid #630E2B;">
        <tr>
            <td style="text-align: center; padding: 20px 0;">
                <h2 style="color: #630E2B; margin: 0 0 10px;">${data.title || "Confirm Email"}</h2>
                <p style="color: #444; font-size: 15px;">Copy the code below to verify your email address:</p>
                <div style="margin: 20px auto; padding: 12px 20px; background-color: #fff; border: 2px dashed #88BDBF; width: max-content; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #630E2B;">
                    ${data.code}
                </div>
                <p style="color: #888; font-size: 13px;">This code will expire in 10 minutes.</p>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding-top: 15px; border-top: 1px solid #ddd;">
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-facebook"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-twitter"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-instagram"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-linkedin"></i></a>
            </td>
        </tr>
    </table>
</body>
</html>`,

        [LanguageEnum.AR]: (data) => `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style type="text/css">
        body { background-color: #88BDBF; margin: 0px; font-family: Tahoma, Arial, sans-serif; }
    </style>
</head>
<body style="margin:0px;" dir="rtl">
    <table border="0" width="50%" style="margin:auto; padding:30px; background-color: #F3F3F3; border:1px solid #630E2B;">
        <tr>
            <td style="text-align: center; padding: 20px 0;">
                <h2 style="color: #630E2B; margin: 0 0 10px;">${data.title || "تأكيد البريد الإلكتروني"}</h2>
                <p style="color: #444; font-size: 15px;">انسخ الرمز أدناه لتأكيد بريدك الإلكتروني:</p>
                <div style="margin: 20px auto; padding: 12px 20px; background-color: #fff; border: 2px dashed #88BDBF; width: max-content; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #630E2B;">
                    ${data.code}
                </div>
                <p style="color: #888; font-size: 13px;">صلاحية هذا الرمز تنتهي خلال 10 دقائق.</p>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding-top: 15px; border-top: 1px solid #ddd;">
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-facebook"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-twitter"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-instagram"></i></a>
                <a href="#" style="margin: 0 8px; color: #88BDBF; text-decoration: none;"><i class="fa fa-linkedin"></i></a>
            </td>
        </tr>
    </table>
</body>
</html>`
    },

    [EmailSubjectEnum.TWO_STEP_VERIFICATION]: {
        [LanguageEnum.EN]: (data) => `<!DOCTYPE html>
<html>
<head><style>body { font-family: sans-serif; background-color: #88BDBF; margin: 0; }</style></head>
<body>
    <table border="0" width="50%" style="margin:auto; padding:30px; background-color: #F3F3F3; border:1px solid #630E2B;">
        <tr>
            <td style="text-align: center; padding: 20px 0;">
                <h2 style="color: #630E2B;">Two-Step Verification</h2>
                <p style="color: #444; font-size: 15px;">Use the code below to complete your login:</p>
                <div style="margin: 20px auto; padding: 12px 20px; background-color: #fff; border: 2px dashed #88BDBF; width: max-content; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #630E2B;">
                    ${data.code}
                </div>
                <p style="color: #888; font-size: 13px;">This code will expire in 2 minutes.</p>
            </td>
        </tr>
    </table>
</body>
</html>`,

        [LanguageEnum.AR]: (data) => `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><style>body { font-family: Tahoma, Arial, sans-serif; background-color: #88BDBF; margin: 0; }</style></head>
<body dir="rtl">
    <table border="0" width="50%" style="margin:auto; padding:30px; background-color: #F3F3F3; border:1px solid #630E2B;">
        <tr>
            <td style="text-align: center; padding: 20px 0;">
                <h2 style="color: #630E2B;">التحقق بخطوتين</h2>
                <p style="color: #444; font-size: 15px;">استخدم الرمز التالي لإكمال تسجيل الدخول إلى حسابك:</p>
                <div style="margin: 20px auto; padding: 12px 20px; background-color: #fff; border: 2px dashed #88BDBF; width: max-content; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #630E2B;">
                    ${data.code}
                </div>
                <p style="color: #888; font-size: 13px;">صلاحية هذا الرمز تنتهي خلال دقيقتين.</p>
            </td>
        </tr>
    </table>
</body>
</html>`
    },
}; 

export const verifyEmailTemplate = (data) => {
    const isAr = data.lang === LanguageEnum.AR || data.lang === "ar" || data.lang === 0 || data.lang === "0";
    const lang = isAr ? LanguageEnum.AR : LanguageEnum.EN;
    const templateBySubject = templates[data.subject] || templates[EmailSubjectEnum.CONFIRM_EMAIL];
    const templateFn = templateBySubject[lang] || templateBySubject[LanguageEnum.EN];
    return templateFn(data);
};
