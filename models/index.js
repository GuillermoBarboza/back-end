const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(
  `mongodb+srv://root:${process.env.DB_PASSWORD}@e-commerce.k4gty.mongodb.net/${process.env.DB_DATABASE}`
);
mongoose.set("useFindAndModify", false);
const UserModel = require("./User");
const ProductModel = require("./Product");
const OrderModel = require("./Order");
const CategoryModel = require("./Category");
const { Seed } = require("../seeder");

const User = UserModel(mongoose, Schema);
const Product = ProductModel(mongoose, Schema);
const Order = OrderModel(mongoose, Schema);
const Category = CategoryModel(mongoose, Schema);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", (e) =>
  console.log("¡Conexión con la base de datos establecida!")
);

module.exports = {
  mongoose,
  User,
  Product,
  Order,
  Category,
};

/* Seed(User, Category, Product); */
