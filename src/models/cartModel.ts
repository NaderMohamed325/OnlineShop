import mongoose from "mongoose";

export interface ICart extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    products: {
        productId: string;
        name: string;
        description: string;
        quantity: number;
        price: number;
    }[];
    active: boolean;
    modifiedOn: Date;
}

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export {Cart};