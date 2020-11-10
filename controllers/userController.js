const jwt = require("jsonwebtoken");
const { User } = require("../models");

const createToken = (user) => {
  return jwt.sign({ sub: user }, process.env.JWT_SECRET);
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
    });
    user.tokens = [createToken(user.id)];
    user.save().then(res.json(user));
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

      res.json(user);
    } catch (err) {
      console.log("Something failed", err);
      res.status(500).json({ message: "Something failed on server side" });
    }
  },
};
