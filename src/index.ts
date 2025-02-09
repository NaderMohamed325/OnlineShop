import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.resolve(__dirname, "../src/views"));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log(`server is running`);
});

app.get('/', (req: Request, res: Response) => {
    res.render("index.ejs");
});