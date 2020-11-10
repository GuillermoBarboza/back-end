require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.APP_PORT, () => {
  console.log("ingresar a " + process.env.APP_PORT);
});
