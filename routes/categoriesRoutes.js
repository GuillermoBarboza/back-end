const jwt = require("express-jwt");
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

  app.post(
    "/api/v1/categories",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    create
  );

  app.put(
    "/api/v1/categories",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    update
  );

  app.delete(
    "/api/v1/categories",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    erase
  );
}

module.exports = categoriesRoutes;
