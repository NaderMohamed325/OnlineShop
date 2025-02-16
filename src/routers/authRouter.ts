import express from 'express';
import {LogInPage, LoginPost, LogOut, passwordForgetPage, SignUpPage, SignUpPost} from '../controllers/authController';
import {signInValidation} from "../utils/middleWares/validation/signupValidation";
import {LoginValidation} from "../utils/middleWares/validation/loginValidation";

const authRouter = express.Router();

authRouter.get('/signup', SignUpPage)
authRouter.post('/signup', signInValidation, SignUpPost);

authRouter.get('/login', LogInPage)
    .post('/login', LoginValidation, LoginPost);

authRouter.get("/forgot-password",passwordForgetPage);

authRouter.route('/logout')
    .all(LogOut);

export {authRouter};