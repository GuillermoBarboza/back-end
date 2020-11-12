const { index } = require("../controllers/categoriesController");

function categoriesRoutes(app) {
  app.get("/api/v1/categories/:category", index);
}

module.exports = categoriesRoutes;
