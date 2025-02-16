import express from 'express';
import {passwordResetMailer, passwordResetToken, passwordReset} from '../utils/middleWares/validation/passwordRestValidation';

const passwordResetRouter = express.Router();

passwordResetRouter.post('/password-forget', passwordResetMailer);
passwordResetRouter.get('/reset-password/:token', passwordResetToken);
passwordResetRouter.post('/reset-password', passwordReset);

export {passwordResetRouter};