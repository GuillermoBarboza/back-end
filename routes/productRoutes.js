const {
  getProducts,
  getProductsByName,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

function productRoutes(app) {
  app.get("/api/v1/products", getProducts);

  app.get("/api/v1/products/search", getProductsByName);

  app.post("/api/v1/products", createProduct);

  app.put("/api/v1/products", updateProduct);

  app.delete("/api/v1/products", deleteProduct);
}

module.exports = productRoutes;
