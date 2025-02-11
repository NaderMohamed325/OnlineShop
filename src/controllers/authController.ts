import {NextFunction, Request, Response} from "express";
import {catchAsync} from "../utils/catchAsync";
import {validationResult} from "express-validator";
import {User} from "../models/userModel";
import {AppError} from "../utils/AppError";
import bcrypt from "bcrypt";

const SignUpPage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.render('signup.ejs', {errors: null});
});

const SignUpPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup.ejs', {errors: errors.array()});
    }
    const {name, email, password} = req.body;
    await User.create({name, email, password});
    res.redirect('/login');
});

const LogInPage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.render('login.ejs', {errors: null});
});

const LoginPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.render("login", { errors: [{ msg: "Invalid Email" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("login", { errors: [{ msg: "Invalid Password" }] });
    }


    res.redirect("/dashboard");
});

export {SignUpPage, SignUpPost, LogInPage, LoginPost}