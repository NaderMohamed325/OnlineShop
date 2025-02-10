import mongoose, {Document, Schema} from "mongoose";

interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
}

const productSchema: Schema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must be less than 100 characters"]
    },
    image: {
        type: String,
        required: [true, "Product image is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price must be a positive number"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        minlength: [10, "Product description must be at least 10 characters long"],
        maxlength: [1000, "Product description must be less than 1000 characters"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
        minlength: [3, "Product category must be at least 3 characters long"],
        maxlength: [50, "Product category must be less than 50 characters"]
    }
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export {Product};