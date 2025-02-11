import {catchAsync} from "../../catchAsync";
import {NextFunction, Request, Response} from "express";
import {check, validationResult} from "express-validator";

const LoginValidation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address')
        .run(req);

    await check('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('login.ejs', {errors: errors.array()});
    }

    next();
});


export {LoginValidation}