import {NextFunction, Request, Response} from "express";
import {catchAsync} from "../../catchAsync";
import chalk from "chalk";

const isAuthenticated = catchAsync((req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.green(`Session Checker: ${req.session.id}`));
    console.log(req.session);
    if (req.session.userId) {
        console.log(chalk.green(`Found User Session`));
        next();
    } else {
        console.log(chalk.red(`No User Session Found`));
        res.redirect('/login');
    }
})

export {isAuthenticated}