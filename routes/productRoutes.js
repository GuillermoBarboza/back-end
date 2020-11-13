const {
  getProducts,
  getProductsByName,
  createProduct,
} = require("../controllers/productController");

function productRoutes(app) {
  app.get("/api/v1/products", getProducts);

  app.get("/api/v1/products/search", getProductsByName);

  app.post("/api/v1/products", createProduct);
}

module.exports = productRoutes;
