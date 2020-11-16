const { Category } = require("../models");

module.exports = {
  index: async (req, res) => {
    const categories = await Category.find().limit(30);
    res.json(categories);
  },

  show: async (req, res) => {
    const category = await Category.find({
      name: { $regex: req.query.name, $options: "i" },
    }).limit(10);
    res.json(category);
  },

  create: async (req, res) => {
    const category = await new Category({
      name: req.body.name,
      banner: [],
    });
    await category.save();
    res.json({ name: category.name });
  },

  update: async (req, res) => {
    const category = await Category.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.json("category updated");
  },
};
