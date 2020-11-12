const {
  getProducts,
  getCategory,
  createProduct,
} = require("../controllers/productController");

function productRoutes(app) {
  app.get("/api/v1/products", getProducts);

  app.get("/api/v1/products/:category", getCategory);

  app.post("/api/v1/products", createProduct);
}

module.exports = productRoutes;
