// productRouter.js

import express from "express";
import { ProductManager } from "../productManager.js";

const productRouter = express.Router();
const PM = new ProductManager("./data/products.json");

productRouter.get("/", (req, res) => {
  // Implementa la lógica para listar todos los productos
});

productRouter.get("/:pid", (req, res) => {
  // Implementa la lógica para obtener un producto por ID
});

productRouter.post("/", (req, res) => {
  // Implementa la lógica para agregar un nuevo producto
});

productRouter.put("/:pid", (req, res) => {
  // Implementa la lógica para actualizar un producto por ID
});

productRouter.delete("/:pid", (req, res) => {
  // Implementa la lógica para eliminar un producto por ID
});

export default productRouter;
