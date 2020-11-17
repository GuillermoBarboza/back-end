const jwt = require("express-jwt");
const {
  create,
  getUsers,
  getUserByName,
  updateUser,
  deleteUser,
} = require("../controllers/userAdminController");

function userAdminRoutes(app) {
  app.post(
    "/api/v1/auth/users",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    create
  );

  app.get(
    "/api/v1/auth/users",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getUsers
  );

  app.get(
    "/api/v1/auth/users/search",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getUserByName
  );

  app.put(
    "/api/v1/auth/users",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    updateUser
  );

  app.delete(
    "/api/v1/auth/users",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    deleteUser
  );
}

module.exports = userAdminRoutes;
