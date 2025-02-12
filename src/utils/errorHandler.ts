import {NextFunction, Request, Response} from "express";

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.render('error.ejs', {error: {status: 500, message: err.message}, isUser: req.session.userId});
}

export {globalErrorHandler}