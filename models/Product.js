const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, required: true },
    featured: { type: Boolean, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true },
  });

  const Product = mongoose.model("Product", ProductSchema);

  return Product;
};
