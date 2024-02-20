const express = require("express");
const { arrayProducts } = require("./productManager");
const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Server basico con express");
});

app.get("/products/:pid", (req, res) => {
  let { pid } = req.params;
  pid = Number(pid);

  if (isNaN(pid)) {
    return res.send("El id tiene que ser de valor numérico");
  }

  const product = arrayProducts.find((product) => product.id === pid);

  if (!product) {
    return res.send(`No existen productos con el id ${pid}`);
  }

  res.json(product);
  return;
});

app.get("/products", (req, res) => {
  let { limit, skip } = req.query;

  limit = parseInt(limit, 10);
  skip = parseInt(skip, 10);

  let result = arrayProducts;

  if (!isNaN(skip) && skip > 0) {
    result = result.slice(skip);
  }

  if (!isNaN(limit) && limit > 0) {
    result = result.slice(0, limit);
  }

  res.send(result);
});

app.listen(PORT, () => {
  console.log("SERVER OK", PORT);
});
