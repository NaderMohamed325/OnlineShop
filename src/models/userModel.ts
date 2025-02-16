import mongoose, {CallbackError} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    resetToken: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false
    },
    resetToken: {
        type: String,
        required: false
    }
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);


        } catch (err) {
            next(err as CallbackError);
        }
    }
    next();
});

const User = mongoose.model<IUser>('User', userSchema);
export {User};