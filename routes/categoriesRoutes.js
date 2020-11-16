const {
  index,
  show,
  create,
  update,
} = require("../controllers/categoriesController");

function categoriesRoutes(app) {
  app.get("/api/v1/categories", index);

  app.get("/api/v1/categories/search", show);

  app.post("/api/v1/categories", create);

  app.put("/api/v1/categories", update);
}

module.exports = categoriesRoutes;
