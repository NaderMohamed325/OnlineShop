import {NextFunction, Request, Response} from "express";

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).json({
        status: "error",
        message: err.message
    });
}

export {globalErrorHandler}