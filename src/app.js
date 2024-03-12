import express from "express";
import path from "path";
import __dirname from "./utils.js";
import { productRouter } from "./routes/productRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { ProductManager } from "./classes/productManager.js";
import handlebars from "express-handlebars";
import { router as viewsRouter } from "./routes/viewsRouter.js";
import { productsPath } from "./utils.js";
import { Server } from "socket.io";

process.setMaxListeners(25);
let io;

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas de productos
const productsRouter = express.Router();
const PM = new ProductManager(productsPath);

//Ruta para viewsRouter
app.use("/", viewsRouter);

// Rutas principales
app.get("/", (req, res) => {
  res.status(200).render("home");
});

// Middleware de productos
app.use(
  "/api/products",
  (req, res, next) => {
    req.io = io;
    next();
  },
  productRouter
);

// Incorporar el router de carritos en /api/carts
app.use("/api/carts", cartRouter);

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

io = new Server(server);
