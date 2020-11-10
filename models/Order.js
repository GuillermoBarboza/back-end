const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const OrderSchema = new Schema(
    {
      buyer: { type: Schema.Types.ObjectId, ref: "Users" },
      products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
      state: { type: String, required: true },
    },
    { timestamps: true }
  );
};
