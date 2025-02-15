import {NextFunction, Request, Response} from "express";
import {Product} from "../models/productModel";
import {catchAsync} from "../utils/catchAsync";
import {validationResult} from "express-validator";

const getHome = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = req.query.category as string;
    const products = category ? await Product.find({category}) : await Product.find();
    const categories = await Product.distinct('category');
    categories.sort();

    res.render("index.ejs", {products, categories, isUser: req.session.userId, errors: validationResult(req).array()});
});

const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productsData = Object.values(req.body); // Extract values from the object
    const products = await Product.insertMany(productsData);

    res.status(201).json({
        status: "success",
        data: {
            products
        }
    });
});

export {getHome, createProduct};