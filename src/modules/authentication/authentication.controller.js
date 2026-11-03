import { Router } from "express";
import { confirmEmail, login, requestForgotPassword, resendConfirmEmail, resetForgetPassword, signup, verfiyForgotPasswordCode, verfiyLoginOtp } from "./authentication.service.js";
import { successResponse } from "../../common/utils/index.js";
import * as validators from "./authentication.vaildation.js"
import { BadExecuption } from "../../common/execuptions/error.execuptions.js";
import { Validation } from "../../middleware/validation.middleware.js";
const router = Router();

router.post("/signup", Validation(validators.signup), async (req, res, next) => {
    const data = await signup(req.body, req.lang);
    return successResponse({ res, status: 201, data });
});

router.patch("/confirm-email", Validation(validators.confirmEmail), async (req, res, next) => {
    const data = await confirmEmail(req.validate?.body || req.body);
    return successResponse({ res, data });
});

router.post("/request-forget-password-code", Validation(validators.resendConfirmEmail), async (req, res, next) => {
    const data = await requestForgotPassword(req.validate?.body || req.body, req.lang);
    return successResponse({ res, status: 201, data });
});

router.post("/verify-forget-password", Validation(validators.confirmEmail), async (req, res, next) => {
    const data = await verfiyForgotPasswordCode(req.validate?.body || req.body, req.lang);
    return successResponse({ res, data });
});

router.patch("/reset-forget-password", Validation(validators.resetForgetPasswordSchema), async (req, res, next) => {
    const data = await resetForgetPassword(req.validate?.body || req.body, req.lang);
    return successResponse({ res, data });
});
router.patch("/verify-login-otp", Validation(validators.verifyLoginOtp), async (req, res, next) => {
    const data = await verfiyLoginOtp(req.validate?.body || req.body, `${req.protocol}://${req.host}`);
    return successResponse({ res, data });
});

router.patch("/resend-confirm-email", Validation(validators.resendConfirmEmail), async (req, res, next) => {
    const data = await resendConfirmEmail(req.validate?.body || req.body, req.lang);
    return successResponse({ res, data });
});

router.post("/login",Validation(validators.login) ,async (req, res, next) => {
    const data = await login(req.validate.body, `${req.protocol}://${req.host}`,req.lang)
    return successResponse({ res, data })
})

export default router
