const jwt = require("jsonwebtoken");
const { User } = require("../models");

const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

module.exports = {
  create: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const user = await new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        telephone: req.body.telephone,
        password: req.body.password,
        admin: req.body.admin,
      });
      user.tokens = [createToken(user.id)];
      await user.save();
      return res.json({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        telephone: user.telephone,
        token: user.tokens[0],
        admin: user.admin,
      });
    }
  },

  getUsers: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const users = await User.find().limit(20);
      return res.json(users);
    } else {
      return res.json("unauthorized");
    }
  },

  getUserByName: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const users = await User.find({
        name: { $regex: req.query.name, $options: "i" },
      }).limit(10);
      return res.json(users);
    } else {
      return res.json("unauthorized");
    }
  },

  updateUser: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.json("user updated");
  },

  deleteUser: async (req, res) => {
    const users = await User.findByIdAndDelete(req.body._id);
    res.json("user deleted");
  },
};
