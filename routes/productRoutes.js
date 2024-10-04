const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all products with optional filtering
router.get("/products", async (req, res) => {
  try {
    const { category, sort, type, search } = req.query;

    let query = {};

    console.log("Search Term:", search); // Logs the search term
    console.log("Query:", query); // Logs the query being sent to MongoDB

    // Filter by category
    if (category) {
      query.category = { $in: [category] };
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Search by title or description
    if (search) {
      query.$text = { $search: search };
    }

    let products = Product.find(query);

    // Sort by price
    if (sort) {
      if (sort === "low-to-high") {
        products = products.sort({ price: 1 });
      } else if (sort === "low-to-high") {
        products = products.sort({ price: -1 });
      }
    }

    const result = await products.exec();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product (admin)
router.post("/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
