require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

productRoutes(app);
categoriesRoutes(app);
userRoutes(app);
orderRoutes(app);




app.listen(process.env.APP_PORT, () => {
  console.log("ingresar a " + process.env.APP_PORT);
});
