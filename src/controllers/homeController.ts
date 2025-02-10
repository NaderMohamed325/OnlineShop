import {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/AppError";
import {Product} from "../models/productModel";
import {catchAsync} from "../utils/catchAsync";

const getHome = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        const categories = [...new Set(products.map((product) => product.category))];

        res.render("index.ejs", { products, categories });
    } catch (error) {
        console.error(error);
        next(new AppError("Error fetching products", 500));
    }
});


const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productsData = Object.values(req.body); // Extract values from the object
        const products = await Product.insertMany(productsData);

        res.status(201).json({
            status: "success",
            data: {
                products
            }
        });
    } catch (error) {
        console.error(error);
        next(new AppError("Error creating products", 500));
    }
});

export {getHome, createProduct};