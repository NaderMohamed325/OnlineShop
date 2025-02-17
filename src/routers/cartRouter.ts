import express from "express";
import {addToCart, checkout, getCart, removeFromCart} from "../controllers/cartController";
import {cartValidation} from "../utils/middleWares/validation/cartValidation";
import {isAuthenticated} from "../utils/middleWares/protect/routeProtection";

const cartRouter = express.Router();

cartRouter.route('/cart-add')
    .post(isAuthenticated, cartValidation, addToCart);

cartRouter.route('/cart')
    .get(isAuthenticated, getCart);

cartRouter.route('/cart/:productId/delete')
    .post(removeFromCart);

cartRouter.route('/checkout')
    .get(checkout);


export {cartRouter};