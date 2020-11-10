const { Products } = require("../models");

module.exports = {
  homeController: async (req, res) => {
    const products = await Products.find({}).limit(20);
    console.log("pinto");
    res.json(products);
  },
};
