const {
  getProducts,
  createProduct,
} = require("../controllers/productController");

function productRoutes(app) {
  app.get("/api/v1/products", getProducts);

  app.post("/api/v1/products", createProduct);
}

module.exports = productRoutes;
