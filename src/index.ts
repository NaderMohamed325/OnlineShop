import express from "express";
import morgan from "morgan";
import path from "path";
import {homeRouter} from "./routers/homeRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'images')))
app.set("views", path.resolve(__dirname, "../src/views"));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRouter);


app.listen(3000, () => {
    console.log(`server is running`);
});

