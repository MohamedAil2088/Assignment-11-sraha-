export const AppException = ({
    message = "error",
    options = {
        cause: { status: 400 }
    }
} = {}) => {
    throw new Error(message, options)
}

export const ConflictException = (message = "conflict", issues = {}) => {
    return AppException({
        message,
        options: {
            cause: { status: 409, issues }
        }
    })
}

export const TooManyRequestsException = (message = "Too many requests", issues = {}) => {
    return AppException({
        message,
        options: {
            cause: { status: 429, issues }
        }
    })
}

export const NotFoundException = (message = "NotFound", issues = {}) => {
    return AppException({
        message,
        options: {
            cause: { status: 404, issues }
        }
    })
}

export const UnauthorizedException = (message = "Unauthorized", issues = undefined) => {
    return AppException({
        message,
        options: {
            cause: { status: 401, issues }
        }
    })
}

export const ForbiddenException = (message = "forbidden", issues = {}) => {
    return AppException({
        message,
        options: {
            cause: { status: 403, issues }
        }
    })
}

export const BadRequestException = (message = "Bad request exception", issues = []) => {
    return AppException({
        message,
        options: {
            cause: {
                status: 400,
                issues
            }
        }
    })
}

// Aliases for backward compatibility with existing code
export const AppExecuption = AppException;
export const ConflictExecuption = ConflictException;
export const NotFoundExecuption = NotFoundException;
export const ForbiddenExecuption = ForbiddenException;
export const BadExecuption = BadRequestException;
