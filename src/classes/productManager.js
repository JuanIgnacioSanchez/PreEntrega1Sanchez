import fs from "fs";
import { productsPath } from "../utils.js";

class Product {
  constructor(id, code, title, description, price, thumbnail, stock) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }
}

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
    this.currentId =
      this.products.length > 0
        ? Math.max(...this.products.map((product) => product.id)) + 1
        : 1;
  }

  initializeFile() {
    const directory = "./data/";
    const filePath = `${directory}products.json`;

    try {
      // Verificar si el directorio existe, si no, créalo
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }

      // Verificar si el archivo existe, si no, créalo
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf8");
      }
    } catch (error) {
      console.error("Error al inicializar el archivo:", error);
    }
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, "utf8");
  }

  calculateCurrentId() {
    return this.products.length > 0
      ? Math.max(...this.products.map((product) => product.id)) + 1
      : 1;
  }

  addProduct(productData) {
    const { code, title, description, price, thumbnail, stock } = productData;
    if (!code || !title || !description || !price || !thumbnail || !stock) {
      console.log(
        "Todos los campos son obligatorios. Por favor, complete todos."
      );
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log(
        `El código ${code} ya existe. Por favor, ingrese uno diferente.`
      );
      return;
    }

    const newProduct = new Product(
      this.currentId,
      code,
      title,
      description,
      price,
      thumbnail,
      stock
    );
    this.products.push(newProduct);
    this.saveProducts();
    this.currentId++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productId = Number(id);
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      console.log(
        `No existen productos con el id ${id}, por favor pruebe con un id existente.`
      );
    }

    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      console.log("El producto con el id " + id + " ha sido actualizado.");
      return true;
    }
    return false;
  }

  reorganizeProductIds() {
    this.products.forEach((product, index) => {
      const newId = index + 1;
      product.id = newId;
    });
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.reorganizeProductIds();
      this.saveProducts();
      console.log("El producto con el id " + id + " ha sido eliminado.");
      return true;
    }
    console.log("No existe un producto con el id " + id + ".");
    return false;
  }
}

// Ejemplo de uso
const PM = new ProductManager(productsPath);

export let arrayProducts = PM.getProducts();

export { ProductManager };

/*
PM.addProduct({
  code: "1118",
  title: "iPhone X | 64gb",
  description:
    "Teléfono inteligente Apple con almacenamiento de 64 GB, color blanco",
  price: "250",
  thumbnail:
    "https://todoapplecaba.com.ar/wp-content/uploads/2021/05/apple-iphone-x-64gb-silver-used-20191122085356800-_w500_1-8532858c58bff3411615996662135414-640-0.jpg",
  stock: "3",
});

PM.addProduct({
  code: "1112",
  title: "iPhone 11 | 64gb",
  description:
    "Teléfono inteligente Apple con almacenamiento de 64 GB, color negro",
  price: "400",
  thumbnail:
    "https://todoapplecaba.com.ar/wp-content/uploads/2021/05/apple-iphone-x-64gb-silver-used-20191122085356800-_w500_1-8532858c58bff3411615996662135414-640-0.jpg",
  stock: "3",
});

PM.addProduct({
  code: "1113",
  title: "iPhone 11 | 128gb",
  description:
    "Teléfono inteligente Apple con almacenamiento de 128 GB, color blanco",
  price: "450",
  thumbnail:
    "https://todoapplecaba.com.ar/wp-content/uploads/2021/05/apple-iphone-x-64gb-silver-used-20191122085356800-_w500_1-8532858c58bff3411615996662135414-640-0.jpg",
  stock: "3",
});

PM.addProduct({
  code: "1114",
  title: "iPhone 12 | 128gb",
  description:
    "Teléfono inteligente Apple con almacenamiento de 128 GB, color midnight",
  price: "450",
  thumbnail:
    "https://todoapplecaba.com.ar/wp-content/uploads/2021/05/apple-iphone-x-64gb-silver-used-20191122085356800-_w500_1-8532858c58bff3411615996662135414-640-0.jpg",
  stock: "3",
});

PM.addProduct({
  code: "1115",
  title: "iPhone 13 | 256gb",
  description:
    "Teléfono inteligente Apple con almacenamiento de 256 GB, color cobre",
  price: "450",
  thumbnail:
    "https://todoapplecaba.com.ar/wp-content/uploads/2021/05/apple-iphone-x-64gb-silver-used-20191122085356800-_w500_1-8532858c58bff3411615996662135414-640-0.jpg",
  stock: "3",
});

console.log("\n\n\n", PM.getProducts());

console.log("\n\n\n Obteniendo producto con id 1:  ", PM.getProductById(1));

PM.updateProduct(1, { price: "290" });

console.log("\n\n\n", PM.getProducts());

PM.deleteProduct(1);
PM.deleteProduct(2);
PM.deleteProduct(3);

console.log("\n\n\n", PM.getProducts()); */
