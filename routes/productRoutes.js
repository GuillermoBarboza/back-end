const jwt = require("express-jwt");
const {
  getProducts,
  getProductsByName,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

function productRoutes(app) {
  app.get("/api/v1/products", getProducts);

  app.get("/api/v1/products/search", getProductsByName);

  app.get("/api/v1/products/:category", getProductsByCategory);

  app.post(
    "/api/v1/products",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    createProduct
  );

  app.put(
    "/api/v1/products",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateProduct
  );

  app.delete(
    "/api/v1/products",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteProduct
  );
}

module.exports = productRoutes;
