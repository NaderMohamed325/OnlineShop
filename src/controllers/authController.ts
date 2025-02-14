import {NextFunction, Request, Response} from "express";
import {catchAsync} from "../utils/catchAsync";
import {validationResult} from "express-validator";
import {User} from "../models/userModel";
import bcrypt from "bcrypt";

const SignUpPage = catchAsync(async (req: Request, res: Response) => {
    return res.render("signup.ejs", {errors: null, isUser: req.session.userId});
});

const SignUpPost = catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("signup.ejs", {errors: errors.array()});
    }

    const {name, email, password} = req.body;
    await User.create({name, email, password});

    return res.redirect("/login");
});

const LogInPage = catchAsync(async (req: Request, res: Response) => {
    return res.render("login.ejs", {errors: null, isUser: req.session.userId});
});

const LoginPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return res.render("login.ejs", {errors: [{msg: "Invalid credentials"}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("login.ejs", {errors: [{msg: "Invalid credentials"}]});
    }
    console.log("Session:", req.session);
    console.log("Session User ID:", req.session.userId);

    req.session.userId= user._id as string;

    req.session.save((err) => {
        if (err) {
            console.error("Session save error:", err);
            return next(err); // Pass error to the error handler middleware
        }
        return res.redirect("/dashboard");
    });
});

const LogOut = catchAsync(async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Session destroy error:", err);
            return res.render("error.ejs",
                {
                    error: {status: 500, message: "Something went wrong. Please try again."}
                    , isUser: req.session.userId
                });
        }
        return res.redirect("/login");
    });
});

export {SignUpPage, SignUpPost, LogInPage, LoginPost, LogOut};
