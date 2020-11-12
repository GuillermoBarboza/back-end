const { Product } = require("../models");

module.exports = {
  getProducts: async (req, res) => {
    const products = await Product.find(undefined);
    res.json(products);
  },

  getCategory: async (req, res) => {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.json(products);
  },

  createProduct: async (req, res) => {
    const product = await new Product({
      name: "",
      description: "",
      image: "",
      price: 0,
      category: "",
      stock: 0,
      featured: false,
      slug: "",
    });
    product.save().then(res.json(product));
  },
};
