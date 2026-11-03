import { LanguageEnum } from "../enum/index.js"

export const languageMiddleware = (req, res, next) => {
    const rawLang = req.headers["lang"] || req.headers["accept-language"]
    const isAr = rawLang === "ar" || rawLang === 0 || rawLang === "0" || String(rawLang).startsWith("ar")
    req.lang = isAr ? LanguageEnum.AR : LanguageEnum.EN
    return next()
}