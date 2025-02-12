import {createProduct, getHome} from "../controllers/homeController";
import express from "express";
import {isAuthenticated} from "../utils/middleWares/protect/routeProtection";

const homeRouter = express.Router();

homeRouter.route('/')
    .get(getHome)
    .post(createProduct);


export {homeRouter}