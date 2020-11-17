const jwt = require("express-jwt");
const { store, index } = require("../controllers/orderController");

function orderRoutes(app) {
  app.post(
    "/api/v1/orders",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    store
  );

  app.get(
    "/api/v1/orders",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    index
  );
}

module.exports = orderRoutes;
