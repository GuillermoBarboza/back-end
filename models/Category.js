const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const CategorySchema = new Schema({
    name: { type: String, required: true },
    banner: { type: Array, required: true },
    productsList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  });

  const Category = mongoose.model("Category", CategorySchema);

  return Category;
};
