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

dotenv.config();

const MongoDBStore = sessionStore(session);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../src/views"));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
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

// Routers
app.use('/', homeRouter);
app.use('/', productRouter);
app.use('/', authRouter);

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.all('*', (req: Request, res: Response) => {
    res.render('error.ejs', {error: {status: 404, message: `Can't find ${req.originalUrl} on this server`}});
    console.error(`Can't find ${req.originalUrl} on this server`);
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});