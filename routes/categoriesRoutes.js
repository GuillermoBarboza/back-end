const { index, show } = require("../controllers/categoriesController");

function categoriesRoutes(app) {
  app.get("/api/v1/categories", index);

  app.get("/api/v1/categories/search", show);
}

module.exports = categoriesRoutes;
