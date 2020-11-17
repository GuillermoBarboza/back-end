const jwt = require("jsonwebtoken");
const { User } = require("../models");

const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

module.exports = {
  register: async (req, res) => {
    const user = await new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      telephone: req.body.telephone,
      password: req.body.password,
      admin: false,
    });
    user.tokens = [createToken(user.id)];
    await user.save();
    res.json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      telephone: user.telephone,
      token: user.tokens[0],
      admin: user.admin,
    });
  },

  logIn: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      if (!(await user.validPassword(req.body.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const newToken = createToken(user.id);
      user.tokens.push(newToken);
      user.save();

      res.json({
        name: user.name,
        token: user.tokens[user.tokens.length - 1],
        admin: user.admin,
      });
    } catch (err) {
      console.log("Something failed", err);
      res.status(500).json({ message: "Something failed on server side" });
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
