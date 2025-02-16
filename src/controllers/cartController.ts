import {NextFunction, Request, Response} from "express";
import {catchAsync} from "../utils/catchAsync";
import {validationResult} from "express-validator";
import {Cart} from "../models/cartModel";
import {Product} from "../models/productModel";

const addToCart = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const errors = validationResult(req);
    const category = req.query.category as string;
    const products = category ? await Product.find({category}) : await Product.find();
    const categories = await Product.distinct('category');
    categories.sort();
    if (!errors.isEmpty()) {
        return res.render("index.ejs", {products, categories, isUser: req.session.userId, errors: errors.array()});
    }

    const cart = await Cart.findOne({userId: req.session.userId, active: true});
    const product = {
        productId: req.body.productID,
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
    };

    if (cart) {
        const productIndex = cart.products.findIndex(p => p.productId === req.body.productID);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += req.body.quantity;
        } else {
            cart.products.push(product);
        }
        cart.modifiedOn = new Date();
        await cart.save();
    } else {
        await Cart.create({
            userId: req.session.userId,
            products: [product]
        });
    }

    req.flash('success_msg', 'Product added to cart successfully!');
    res.redirect("/");
});

const getCart = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const cart = await Cart.findOne({userId: req.session.userId, active: true});
    res.render("cart.ejs", {cart, isUser: req.session.userId});

});

export {addToCart , getCart};