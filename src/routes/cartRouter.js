import express from "express";

const cartRouter = express.Router();

cartRouter.post("/", (req, res) => {
  // Implementa la lógica para crear un nuevo carrito
});

cartRouter.get("/:cid", (req, res) => {
  // Implementa la lógica para obtener productos de un carrito por ID
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  // Implementa la lógica para agregar un producto a un carrito por ID
});

export default cartRouter;
