import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
export const globalErrorHandling = async (error, req, res, next) => {

    if (req?.savedFiles?.length) {
        for (const filePath of req.savedFiles) {
            await unlink(resolve(`./${filePath}`)).catch(() => { });
        }
    }
    return res.status(error.cause?.status ?? 500).json({
        error_message: error.message || 'server error',
        issues: error.cause?.issues,
        error,
        cause: error.cause,
        stack: error.stack
    })
}
