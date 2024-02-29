import fs from "fs";
import { generateUniqueId } from "./utils.js";

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveCarts() {
    const data = JSON.stringify(this.carts, null, 2);
    fs.writeFileSync(this.path, data, "utf8");
  }

  createCart() {
    const newCart = {
      id: generateUniqueId(),
      products: [],
    };

    this.carts.push(newCart);
    this.saveCarts();

    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  getAllCarts() {
    return this.carts;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      return {
        success: false,
        message: `No existe un carrito con el id ${cartId}`,
      };
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCarts();

    return {
      success: true,
      message: "Producto agregado al carrito correctamente",
      cart,
    };
  }

  deleteCart(cartId) {
    const index = this.carts.findIndex((cart) => cart.id === cartId);

    if (index === -1) {
      return {
        success: false,
        message: `No existe un carrito con el id ${cartId}`,
      };
    }

    this.carts.splice(index, 1);
    this.saveCarts();

    return {
      success: true,
      message: `Carrito con id ${cartId} eliminado correctamente`,
    };
  }

  removeProductFromCart(cartId, productId) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      return {
        success: false,
        message: `No existe un carrito con el id ${cartId}`,
      };
    }

    const product = cart.products.find((p) => p.id === productId);

    if (!product) {
      return {
        success: false,
        message: `No existe un producto con el id ${productId} en el carrito`,
      };
    }

    if (product.quantity > 1) {
      // Restar 1 a la cantidad si es mayor que 1
      product.quantity -= 1;
    } else {
      // Eliminar completamente el producto si la cantidad es 1
      const index = cart.products.indexOf(product);
      cart.products.splice(index, 1);
    }

    this.saveCarts();

    return {
      success: true,
      message: "Producto modificado en el carrito correctamente",
      cart,
    };
  }
}

export { CartManager };
