const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  category: [{ type: String, required: true }],
  sizes: [{ type: String }],
  stockLevels: [{ size: String, stock: Number }],
  description: { type: String, required: false },
  type: { type: String, required: true },
});

productSchema.index({ title: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
