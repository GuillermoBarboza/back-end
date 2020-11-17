const jwt = require("express-jwt");
const {
  store,
  getChartOrders,
  index,
} = require("../controllers/orderController");

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

  app.get(
    "/api/v1/orders/chart",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getChartOrders
  );
}

module.exports = orderRoutes;
