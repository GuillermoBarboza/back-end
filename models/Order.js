const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const OrderSchema = new Schema(
    {
      buyer: { type: Schema.Types.ObjectId, ref: "User" },
      products: [],
      state: { type: String, required: true },
      total: { type: Number, required: true },
    },
    { timestamps: true }
  );

  const Order = mongoose.model("Order", OrderSchema);

  return Order;
};
