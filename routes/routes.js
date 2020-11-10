const { homeController } = require("../controllers/routesController");

function routes(app) {
  app.get("/api/v1/products", (req, res) => {
    homeController(req, res);
  });
}

module.exports = routes;
