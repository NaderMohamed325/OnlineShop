import mongoose, {Document, Schema} from "mongoose";
import {NextFunction, Request, Response} from "express";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/`).then(() => {
    console.log("connected to database")
}).catch((error) => {
    console.log("error connecting to database")
    console.log(error)
});

interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
}

const productSchema: Schema = new mongoose.Schema<IProduct>({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true}
});
const getAll = (req: Request, res: Response, next: NextFunction) => {
    return Product.find().then((products) => {
            res.json(products)
        }
    ).catch((error) => {
        res.json({error: error})
    })
}


const Product = mongoose.model<IProduct>("Product", productSchema);
export {Product, getAll};
