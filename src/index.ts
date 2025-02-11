import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import { homeRouter } from "./routers/homeRouter";
import mongoose from "mongoose";
import { globalErrorHandler } from "./utils/errorHandler";
import dotenv from "dotenv";
import { productRouter } from "./routers/productRouter";
import {authRouter} from "./routers/authRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'images')));
app.set("views", path.resolve(__dirname, "../src/views"));

mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/products`)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("Error connecting to database");
        console.error(error);
    });

app.use('/', homeRouter);
app.use('/', productRouter);
app.use('/',authRouter);
app.use(globalErrorHandler);
app.all('*', (req: Request, res: Response) => {
    res.render('error.ejs', { error: { status: 404, message: `Can't find ${req.originalUrl} on this server` } });
    console.error(`Can't find ${req.originalUrl} on this server`);
});


app.listen(3000, () => {
    console.log(`Server is running`);
});