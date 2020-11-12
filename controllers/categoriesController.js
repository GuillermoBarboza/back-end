const { Product } = require("../models");

module.exports = {
  index: async (req, res) => {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.json(products);
  },
};
