const { User, Order } = require("../models");

module.exports = {
  store: async (req, res) => {
    const order = await new Order({
      buyer: req.user,
      products: req.body.cart,
      state: "pending",
      total: req.body.total,
    });
    await order.save();
    await User.findByIdAndUpdate(
      { _id: req.user },
      { $push: { orderlist: order } }
    );
    res.json("Thanks for buying here");
  },

  index: async (req, res) => {
    const user = await User.findById(req.user);
    if (user.admin === true) {
      const orders = await Order.find({ state: "paid" }).sort("-createdAt");
      return res.json(orders);
    } else {
      return res.json("unauthorized");
    }
  },
};
