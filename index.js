class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(code, title, description, price, thumbnail, stock) {
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

    let id = 1;
    if (this.products.length > 0) {
      id = this.products[this.products.length - 1].id + 1;
    }

    let newProduct = { id, code, title, description, price, thumbnail, stock };
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find((product) => product.id === id);

    if (!product) {
      console.log(
        `No existen productos con el id ${id}, por favor pruebe con un id existente.`
      );
      return;
    }

    return product;
  }
}

let PM = new ProductManager();

PM.addProduct(
  "1111",
  "iPhone X | 64gb",
  "Teléfono inteligente Apple con almacenamiento de 64 GB, color blanco",
  "250",
  "https://todoapplecaba.com.ar/wp-content/uploads/2021/05/apple-iphone-x-64gb-silver-used-20191122085356800-_w500_1-8532858c58bff3411615996662135414-640-0.jpg",
  "3"
);
PM.addProduct(
  "1112",
  "iPhone XS | 256gb",
  "Teléfono inteligente Apple con almacenamiento de 256 GB, color gold",
  "370",
  "https://micelu.co/wp-content/uploads/2022/12/IPHONE-XS-DORADO.jpg",
  "1"
);
PM.addProduct(
  "1113",
  "iPhone 12 mini | 128gb",
  "Teléfono inteligente Apple con almacenamiento de 128 GB, color midnight",
  "430",
  "https://www.apple.com/newsroom/images/product/iphone/geo/apple_iphone-12_2-up_geo_10132020_inline.jpg.large.jpg",
  "3"
);
PM.addProduct(
  "1114",
  "iPhone 14 | 256gb",
  "Teléfono inteligente Apple con almacenamiento de 256 GB, color deep purple",
  "850",
  "https://www.gsmpro.cl/cdn/shop/products/apple-iphone-14.png?v=1670440531",
  "2"
);
PM.addProduct(
  "1115",
  "iPhone 15 Pro | 1tb",
  "Teléfono inteligente Apple con almacenamiento de 1 TB, color grey",
  "1450",
  "https://spacenet.tn/184578-large_default/iphone-15-128go-noir.jpg",
  "1"
);
console.log(PM.getProducts());
console.log(PM.getProductById(2));
console.log(PM.getProductById(4));
