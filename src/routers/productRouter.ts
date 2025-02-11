import express from "express";
import {getProduct} from "../controllers/productController";

const productRouter = express.Router();

productRouter.route('/product/:id')
.get(getProduct);



export {productRouter}