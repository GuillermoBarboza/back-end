const {
  index,
  show,
  create,
  update,
  erase,
} = require("../controllers/categoriesController");

function categoriesRoutes(app) {
  app.get("/api/v1/categories", index);

  app.get("/api/v1/categories/search", show);

  app.post("/api/v1/categories", create);

  app.put("/api/v1/categories", update);

  app.delete("/api/v1/categories", erase);
}

module.exports = categoriesRoutes;
