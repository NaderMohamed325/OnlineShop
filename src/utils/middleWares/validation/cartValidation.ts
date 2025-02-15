import {check} from "express-validator";

const cartValidation = [
    check("productID").isString().withMessage("Product ID must be a string"),
    check("name").isString().withMessage("Name must be a string"),
    check("description").isString().withMessage("Description must be a string"),
    check("price").isNumeric().withMessage("Price must be a number"),
    check("quantity").isInt({min: 1}).withMessage("Quantity must be a number")
];

export {cartValidation};