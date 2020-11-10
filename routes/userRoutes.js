const jwt = require("express-jwt");
const { register, logIn } = require("../controllers/userController");

function userRoutes(app) {
  app.post("/api/v1/users/create", register);

  app.post("/api/v1/users/find", logIn);
}

module.exports = userRoutes;

/* jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), */
