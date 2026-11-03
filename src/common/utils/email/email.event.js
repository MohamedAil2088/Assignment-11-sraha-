import { EventEmitter } from "node:events";
import { sendEmail } from "./send.email.js";
import { verifyEmailTemplate } from "./email.templet.js";
import { EmailSubjectMap, LanguageEnum } from "../../../enum/index.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendEmail", async ({ recipient, subject, data, lang = LanguageEnum.EN }) => {
    try {
        const isAr = lang === LanguageEnum.AR || lang === "ar" || lang === 0 || lang === "0";
        const targetLang = isAr ? LanguageEnum.AR : LanguageEnum.EN;
        const emailSubject = EmailSubjectMap?.[targetLang]?.[subject] || subject;
        await sendEmail({
            ...recipient,
            subject: emailSubject,
            html: verifyEmailTemplate({
                code: data.code,
                subject,
                title: emailSubject,
                lang: targetLang
            })
        });
    } catch (error) {
        console.log(error);
    }
});
