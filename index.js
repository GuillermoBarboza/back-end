require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

productRoutes(app);
userRoutes(app);

app.listen(process.env.APP_PORT, () => {
  console.log("ingresar a " + process.env.APP_PORT);
});
