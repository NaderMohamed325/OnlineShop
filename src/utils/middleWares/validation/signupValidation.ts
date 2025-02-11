import { check } from 'express-validator';

const signInValidation = [
    check('name')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Name should contain only alphabetic characters and spaces'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address'),
    check('password')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be between 8 and 64 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one number, one uppercase letter, and one lowercase letter'),
    check('passwordConfirmation')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match the password');
            }
            return true;
        })
];

export { signInValidation };