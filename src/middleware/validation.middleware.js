import { number } from "zod"
import { BadExecuption } from "../common/execuptions/error.execuptions.js"
import { LanguageEnum } from "../enum/security.enum.js"

export const Validation = (schema)=>{

    return (req,res,next)=>{
        const language = req.lang
        console.log({language});
        
        const validationResult = schema(language).safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        })
            if (!validationResult.success) {
                throw BadExecuption("Validation Error" ,  validationResult.error.issues)
            }
            req.validate = validationResult.data
            next()
    }
}