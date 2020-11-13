const { Product } = require("../models");

module.exports = {
  getProducts: async (req, res) => {
    const products = await Product.find();
    res.json(products);
  },

  getProductsByName: async (req, res) => {
    const products = await Product.find({
      name: { $regex: req.query.name, $options: "i" },
    });
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
