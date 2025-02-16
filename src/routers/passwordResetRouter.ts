import express from 'express';
import {
    passwordReset,
    passwordResetMailer,
    passwordResetToken,
    passwordResetValidation
} from '../utils/middleWares/validation/passwordRestValidation';

const passwordResetRouter = express.Router();

passwordResetRouter.post('/password-forget', passwordResetMailer);
passwordResetRouter.get('/reset-password/:token', passwordResetToken);
passwordResetRouter.post('/reset-password', passwordResetValidation, passwordReset);

export {passwordResetRouter};