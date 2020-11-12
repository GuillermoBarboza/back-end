const { User, Order } = require("../models");

module.exports = {
  store: async (req, res) => {
    const order = await new Order({
      buyer: req.user,
      products: req.body.cart,
      state: "pending",
    });
    await order.save();
    await User.findByIdAndUpdate(
      { _id: req.user },
      { $push: { orderlist: order } }
    );
    res.json("Thanks for buying here");
  },
};
