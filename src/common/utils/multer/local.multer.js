import multer from "multer";
import { randomUUID } from 'node:crypto'
import { resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises"
import { fileTypeFromBuffer } from 'file-type'
import { BadRequestException } from "../../exceptions/error.exceptions.js";
export const fileValidation = {
    Image: ["image/png", "image/jpeg", "image/gif", "image/jpg", "image/webp"],
    files: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/json"],

}

export const localFileUpload = ({ maxFileSize = 5 } = {}) => {

    const storage = multer.memoryStorage()

    return multer({ storage, limits: { fileSize: maxFileSize * 1024 * 1024 } })
}

export const processFile = async ({ req,customPath = "general", file, validation = [] }) => {

    const result = await fileTypeFromBuffer(file.buffer)
    if (!result || !validation.includes(result.mime)) {
        throw BadRequestException("Invaild file format")
    } else {
        await mkdir(resolve(`./assets/${customPath}`), { recursive: true })
        const unicqeFilePath = `assets/${customPath}/${randomUUID()}.${result.ext}`
        await writeFile(resolve(`./${unicqeFilePath}`), file.buffer)
        file.finalPath = unicqeFilePath
        if (req) {
            req.savedFiles = req.savedFiles || []
            req.savedFiles.push(unicqeFilePath)
        }
        return file
    }
}

export const processFiles = async ({ req,customPath, files = [], validation = [] }) => {
    for (const file of files) {
        const result = await fileTypeFromBuffer(file.buffer)
        if (!result || !validation.includes(result.mime)) {
            throw BadRequestException("Invaild file format")
        }
    }
    const uploaded = []
    for (const file of files) {
        const uploadFile = await processFile({ req,customPath, file, validation })
        uploaded.push(uploadFile)
    }
    return uploaded
}

export const processFields = async ({ req,customPath, fields = {}, validation = [] }) => {
    const uploaded = []
    for (const field of Object.keys(fields)) {
        const files = await processFiles({ req,customPath, files: fields[field], validation })
        uploaded.push({ field, files })
    }
    return uploaded
}



export const processMulterUpload = async ({ req, customPath = "general", validation = [] }) => {

    console.log(req.files);

    if (req.file) {
        await processFile({ req, customPath, file: req.file, validation })
    } else if (Array.isArray(req.files)) {
        await processFiles({ req, customPath, files: req.files, validation })
    } else if (typeof req.files == "object" && Object.keys(req.files)?.length) {
        await processFields({ req, customPath, fields: req.files, validation })
    }


}





// export const processFile = ({ validation = [] }) => {
//     return async (req, res, next) => {
//         const filePath = resolve(`./${req.file.path}`)
//         console.log({ file: req.file, filePath })
//         const fileBuffer = await readFile(filePath)
//         console.log(fileBuffer);
//         const result = await fileTypeFromBuffer(fileBuffer)
//         console.log({ result });
//         if (!result || !validation.includes(result.mime)) {
//            await unlink(filePath)
//             next(new Error("Invaild file format", { cause: { status: 400 } }))
//         }
//         next()
//     }
// }