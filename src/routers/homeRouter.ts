import {createProduct, getHome} from "../controllers/homeController";
import express from "express";

const homeRouter = express.Router();

homeRouter.route('/')
    .get(getHome)
    .post(createProduct);


export {homeRouter}