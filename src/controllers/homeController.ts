import {NextFunction, Request, Response} from "express";

const getHome = (req: Request, res: Response, next: NextFunction) => {
    //get all products


    //rendering the page
    res.render("index.ejs");
}

export {getHome};