import express, {Request, Response} from "express";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import sessionStore from "connect-mongodb-session";
import favicon from "serve-favicon";
import flash from "connect-flash";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import {homeRouter} from "./routers/homeRouter";
import {productRouter} from "./routers/productRouter";
import {authRouter} from "./routers/authRouter";
import {cartRouter} from "./routers/cartRouter";
import {passwordResetRouter} from "./routers/passwordResetRouter";
import {globalErrorHandler} from "./utils/errorHandler";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());
app.use(xss());
app.use(express.json({limit: '10kb'})); // Body limit is 10kb
// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window
    standardHeaders: 'draft-8', // Use combined `RateLimit` header
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/', limiter);
// app.use(hpp());
// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Logging middleware
app.use(morgan('dev'));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../src/views"));

// Serve static files
app.use(express.static(path.join(__dirname, 'images')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Connect to MongoDB
mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/products`)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("Error connecting to database");
        console.error(error);
    });
app.use(mongoSanitize());
// Session store setup
const MongoDBStore = sessionStore(session);
const store = new MongoDBStore({
    uri: process.env.DB_URI || `mongodb://localhost:27017/products`,
    collection: 'sessions'
});
store.on('error', function (error) {
    console.error('Session store error:', error);
});

// Session middleware
app.use(session({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
}));

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routers
app.use('/', homeRouter);
app.use('/', productRouter);
app.use('/', authRouter);
app.use('/', cartRouter);
app.use('/', passwordResetRouter);

// Global error handler
app.use(globalErrorHandler);

app.all('*', (req: Request, res: Response) => {
    res.render('error.ejs', {
        error: {status: 404, message: `Can't find ${req.originalUrl} on this server`},
        isUser: req.session.userId
    });
    console.error(`Can't find ${req.originalUrl} on this server`);
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running`);
});

app.on('error', (error) => {
    console.error('Error starting server:', error);
})
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});