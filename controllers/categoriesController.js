const { Category, User } = require("../models");

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
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const category = await new Category({
        name: req.body.name,
        banner: [],
      });
      await category.save();
      return res.json(category);
    } else {
      return res.json("unauthorized");
    }
  },

  update: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const category = await Category.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        {
          new: true,
        }
      );
      return res.json("category updated");
    } else {
      return res.json("unauthorized");
    }
  },

  erase: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const category = await Category.findById(req.body._id);
      if (category.productsList.length > 0) {
        return res.json("unable to delete category");
      } else {
        const category = await Category.findByIdAndDelete(req.body._id);
        return res.json("category deleted");
      }
    } else {
      return res.json("unauthorized");
    }
  },
};
