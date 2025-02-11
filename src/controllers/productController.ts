import {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/AppError";
import {catchAsync} from "../utils/catchAsync";
import {Product} from "../models/productModel";
import mongoose from "mongoose";

const getProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productID = req.params.id;

    // ✅ Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return next(new AppError("Invalid ID", 400));
    }

    const product = await Product.findById(productID);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    res.render("product.ejs", { product });
});


export {getProduct}