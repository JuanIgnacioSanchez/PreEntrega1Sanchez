import express from "express";
import path from "path";
import __dirname from "./utils.js";
import { productRouter } from "./routes/productRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { ProductManager } from "./productManager.js";

process.setMaxListeners(15);

const app = express();
const PORT = 8080;

// Rutas de productos
const productsRouter = express.Router();
const PM = new ProductManager("./data/products.json");

// Usar el router de productos en /api/products
app.use("/api/products", express.json(), productRouter);

// Incorporar el router de carritos en /api/carts
app.use("/api/carts", express.json(), cartRouter);

// Rutas principales
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi aplicación!");
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
