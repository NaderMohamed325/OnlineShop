import express from "express";
import {addToCart, getCart} from "../controllers/cartController";
import {cartValidation} from "../utils/middleWares/validation/cartValidation";
import {isAuthenticated} from "../utils/middleWares/protect/routeProtection";

const cartRouter = express.Router();

cartRouter.route('/cart-add')
    .post(isAuthenticated, cartValidation, addToCart);

cartRouter.route('/cart')
    .get(isAuthenticated, getCart);


export {cartRouter};