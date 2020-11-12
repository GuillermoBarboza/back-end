const jwt = require("express-jwt");
const { store } = require("../controllers/orderController");

function orderRoutes(app) {
  app.post(
    "/api/v1/orders",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    store
  );
}

module.exports = orderRoutes;
