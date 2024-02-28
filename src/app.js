import express from "express";
import path from "path";
import __dirname from "./utils.js";
import { productRouter } from "./routes/productRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import ProductManager from "./productManager.js";
process.setMaxListeners(15);

const app = express();
const PORT = 8080;

// Rutas de productos
const productsRouter = express.Router();
const PM = new ProductManager("./data/products.json");

// Obtener todos los productos
productsRouter.get("/", (req, res) => {
  const { limit, skip } = req.query;
  let result = PM.getProducts();

  if (!isNaN(skip) && skip > 0) {
    result = result.slice(skip);
  }

  if (!isNaN(limit) && limit > 0) {
    result = result.slice(0, limit);
  }

  res.status(200).json({ result });
});

// Obtener un producto por ID
productsRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = PM.getProductById(Number(pid));

  if (!product) {
    return res
      .status(404)
      .json({ error: `No existen productos con el id ${pid}` });
  }

  res.json(product);
});

// Agregar un nuevo producto
productsRouter.post("/", (req, res) => {
  const productData = req.body;

  if (!productData) {
    return res
      .status(400)
      .json({ error: "Datos de producto no proporcionados" });
  }

  PM.addProduct(productData);
  res.status(201).json({ message: "Producto agregado correctamente" });
});

// Actualizar un producto por ID
productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;

  const success = PM.updateProduct(Number(pid), updatedProduct);

  if (!success) {
    return res
      .status(404)
      .json({ error: `No existen productos con el id ${pid}` });
  }

  res.json({ message: `Producto con id ${pid} actualizado correctamente` });
});

// Eliminar un producto por ID
productsRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const success = PM.deleteProduct(Number(pid));

  if (!success) {
    return res
      .status(404)
      .json({ error: `No existen productos con el id ${pid}` });
  }

  res.json({ message: `Producto con id ${pid} eliminado correctamente` });
});

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Usar el router de productos en /api/products
app.use("/api/products", express.json(), productsRouter);

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
