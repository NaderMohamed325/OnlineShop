import express, {Request, Response} from "express";
import morgan from "morgan";
import path from "path";
import {homeRouter} from "./routers/homeRouter";
import mongoose from "mongoose";
import {globalErrorHandler} from "./utils/errorHandler";
import dotenv from "dotenv";
import {productRouter} from "./routers/productRouter";
import {authRouter} from "./routers/authRouter";
import session from "express-session";
import sessionStore from "connect-mongodb-session";
import favicon from "serve-favicon";
import {cartRouter} from "./routers/cartRouter";
import flash from "connect-flash";
import {passwordResetRouter} from "./routers/passwordResetRouter";


dotenv.config();
const MongoDBStore = sessionStore(session);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'images')));
app.set("views", path.resolve(__dirname, "../src/views"));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/products`)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("Error connecting to database");
        console.error(error);
    });
// Session store setup
const store = new MongoDBStore({
    uri: process.env.DB_URI || `mongodb://localhost:27017/products`,
    collection: 'sessions'
});

store.on('error', function (error) {
    console.error('Session store error:', error);
});

// Session middleware
app.use(session({
    secret: 'my-super-super-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
}));
// After session middleware
app.use(flash());

// Pass flash messages to views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', homeRouter);
app.use('/', productRouter);
app.use('/', authRouter);
app.use('/', cartRouter);
app.use('/',passwordResetRouter);
app.use(globalErrorHandler);
app.all('*', (req: Request, res: Response) => {
    res.render('error.ejs', {
        error: {status: 404, message: `Can't find ${req.originalUrl} on this server`},
        isUser: req.session.userId
    });
    console.error(`Can't find ${req.originalUrl} on this server`);
});

app.listen(3000, () => {
    console.log(`Server is running`);
});