const Product = require("../models/productModel");

// These are PUBLIC ROUTES and can be accessed by anyone.

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// These are PRIVATE ROUTES and can only be accessed by Admin.

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;

    const product = new Product({
      name,
      description,
      stock_quantity,
      low_stock_threshold
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;

    if (stock_quantity < 0) {
      return res.status(400).json({ error: "Stock quantity cannot be negative" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, stock_quantity, low_stock_threshold },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//increase quantity
exports.increaseStock = async (req, res) => {
  try {
    let { quantity } = req.body;

    // Convert to number
    quantity = Number(quantity);

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.stock_quantity = product.stock_quantity + quantity; // Now addition works properly
    await product.save();

    res.json({ product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Decrease stock quantity
exports.decreaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.stock_quantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    product.stock_quantity -= quantity;
    await product.save();

    res.json({ product, updatedBy: req.user.name });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get products below low_stock_threshold
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
