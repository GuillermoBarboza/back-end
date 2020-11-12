const { getCategory } = require("../controllers/productController");

function categoriesRoutes(app) {
  app.get("/api/v1/categories/:category", getCategory);
}

module.exports = categoriesRoutes;
