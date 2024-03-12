import express from "express";
import { v4 as uuidv4 } from "uuid";
import { ProductManager } from "../classes/productManager.js";
import { productsPath } from "../utils.js";

const productRouter = express.Router();
const PM = new ProductManager(productsPath);

// Obtener todos los productos
productRouter.get("/", (req, res) => {
  const { limit } = req.query;
  let result = PM.getProducts();

  if (!isNaN(limit) && limit > 0) {
    result = result.slice(0, limit);
  }

  res.status(200).json({ result });
});

// Ruta para obtener un producto por ID
productRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = PM.getProductById(pid);

  if (!product) {
    return res
      .status(404)
      .json({ error: `No existe un producto con el id ${pid}` });
  }

  res.json(product);
});

// Agregar un nuevo producto
productRouter.post("/", (req, res) => {
  console.log("Ruta para agregar un nuevo producto alcanzada");
  const {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails = [],
  } = req.body;

  // Validar campos obligatorios
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios",
    });
  }

  // Generar un nuevo ID único
  const id = uuidv4();

  // Crear el nuevo producto
  const newProduct = {
    id,
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
    status: true,
  };

  if (!newProduct) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: `Error inesperado en el servidor - El producto no ha podido crearse.`,
    });
  }

  req.io.emit("newProduct", newProduct);
  console.log("Evento 'newProduct' emitido desde el servidor");

  // Agregar el producto al manager
  PM.addProduct(newProduct);

  res.status(201).json({
    message: "Producto agregado correctamente",
    product: newProduct,
  });
});

// Actualizar un producto por ID
productRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;

  // Actualizar el producto
  const success = PM.updateProduct(Number(pid), updatedProduct);

  if (!success) {
    return res
      .status(404)
      .json({ error: `No existe un producto con el id ${pid}` });
  }

  res.json({ message: `Producto con id ${pid} actualizado correctamente` });
});

// Eliminar un producto por ID
productRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const success = PM.deleteProduct(Number(pid));

  if (!success) {
    return res
      .status(404)
      .json({ error: `No existe un producto con el id ${pid}` });
  }

  res.json({ message: `Producto con id ${pid} eliminado correctamente` });
});

export { productRouter };
