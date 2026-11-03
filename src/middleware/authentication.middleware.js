import { ForbiddenExecuption, UnauthorizedException } from "../common/execuptions/error.execuptions.js"
import { basicAuth, decodeToken } from "../common/security/token.security.js"
import { TokenTypeEnum } from "../enum/security.enum.js"

export const authentication = (tokenType = TokenTypeEnum.ACCESS) => {
    return async (req, res, next) => {
        const { authorization } = req.headers
        console.log({ authorization });

        if (!authorization) {
            throw UnauthorizedException("Unauthorized Account")
        }
        const [key, credential] = authorization.split(" ") || []
        console.log({ key, credential });
        switch (key) {
            case "Basic":
                const [email, password] = Buffer.from(credential, 'base64').toString().split(":")
                console.log({ email, password });
                req.user = await basicAuth({ email, password })
                break;
            case "Bearer":
                const { user, payload } = await decodeToken({ authorization: credential, tokenType })
                req.user = user
                req.payload = payload
                break;
            default:
                next(new Error("Invailed authentication schema", { cause: { status: 400 } }))
                break;
        }

        next()
    }
}

export const authorization = (accessRole) => {
    return async (req, res, next) => {
        if (req.user.role < accessRole) {
            throw ForbiddenExecuption("Forbidden Account")
        }
        // if (!accessRole.includes(req.user.role)) {
        //     throw ForbiddenExecuption("Forbidden Account")
        // }
        next()
    }
}