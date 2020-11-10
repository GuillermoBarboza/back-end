const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    featured: { type: Boolean, required: true },
    slug: { type: String, required: true },
  });
};
