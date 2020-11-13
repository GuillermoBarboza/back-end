const { Product } = require("../models");

module.exports = {
  getProducts: async (req, res) => {
    const products = await Product.find().limit(20);
    res.json(products);
  },

  getProductsByName: async (req, res) => {
    const products = await Product.find({
      name: { $regex: req.query.name, $options: "i" },
    }).limit(10);
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

  deleteProduct: async (req, res) => {
    const products = await Product.findByIdAndDelete(req.body._id);
    res.json("product deleted");
  },
};
