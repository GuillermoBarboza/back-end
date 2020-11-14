const {
  register,
  logIn,
  getUsers,
  getUserByName,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

function userRoutes(app) {
  app.post("/api/v1/users/create", register);

  app.post("/api/v1/users/find", logIn);

  app.get("/api/v1/users", getUsers);

  app.get("/api/v1/users/search", getUserByName);

  app.put("/api/v1/users", updateUser);

  app.delete("/api/v1/users", deleteUser);
}

module.exports = userRoutes;
