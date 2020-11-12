const { Category } = require("../models");

module.exports = {
  index: async (req, res) => {
    const { category } = req.params;
    const products = await Category.find({ name: category }).populate(
      "productsList"
    );
    res.json(products);
  },
};
