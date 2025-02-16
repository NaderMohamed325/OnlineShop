import {catchAsync} from "../../catchAsync";
import {NextFunction, Request, Response} from "express";
import {User} from "../../../models/userModel";
import * as crypto from "node:crypto";
import nodemailer from 'nodemailer';
import {validationResult} from "express-validator";
import { check } from 'express-validator';

const passwordResetMailer = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.render("password.ejs", {errors: [{msg: `Email is not Signed`}], isUser: req.session.userId});
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.tokenExpireTime = new Date(Date.now() + 3600000);
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MYEMAIL,
            pass: process.env.EMAILPASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MYEMAIL,
        to: req.body.email,
        subject: 'Password Reset',
        html: `
        <div style="font-family: 'Poppins', sans-serif; color: #333;">
            <h2>Password Reset Request</h2>
            <p>Hi,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="http://localhost:3000/reset-password/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,</p>
            <p>Nader</p>
        </div>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.render('error.ejs', {
                error: {status: 500, message: 'Error in sending email , please try again'},
                isUser: req.session.userId
            });
        } else {
            console.log(`Email sent: ${info.response}`);
            res.render('emailSent.ejs', {isUser: req.session.userId});
        }
    });
});

const passwordResetToken = catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('passwordResetGate.ejs', {
            errors: errors.array(),
            token: req.params.token,
            isUser: req.session.userId
        });
    }
    const {token} = req.params;

    const user = await User.findOne({
        resetToken: token,
        tokenExpireTime: {$gt: Date.now()}
    });
    if (user) {
        res.render('passwordResetGate.ejs', {token, isUser: req.session.userId, errors: null});
    } else {
        res.render('error.ejs', {
            error: {status: 500, message: 'Invalid or expired token'},
            isUser: req.session.userId
        });
    }
});

const passwordResetValidation = [
    check('password')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be between 8 and 64 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one number, one uppercase letter, and one lowercase letter')
];

const passwordReset = catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('passwordResetGate.ejs', {
            errors: errors.array(),
            token: req.body.token,
            isUser: req.session.userId
        });
    }

    const { token, password } = req.body;

    const user = await User.findOne({
        resetToken: token,
        tokenExpireTime: { $gt: Date.now() }
    });

    if (user) {
        user.password = password;
        user.resetToken = "";
        user.tokenExpireTime = undefined;
        await user.save();
        res.render('passwordResetSuccess.ejs', { isUser: req.session.userId });
    } else {
        res.render('error.ejs', {
            error: { status: 500, message: 'Invalid or expired token' },
            isUser: req.session.userId
        });
    }
});

export {passwordResetMailer, passwordResetToken, passwordReset,passwordResetValidation};