const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validateToken = require("../middlewares/validateToken"); 
const role = require("../middlewares/roleMiddleware");

// ------------------ PUBLIC ROUTES ------------------
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// ------------------ PRIVATE ROUTES (Admin only) ------------------
router.post("/", validateToken, role(["Admin"]), productController.createProduct);
router.put("/:id", validateToken, role(["Admin"]), productController.updateProduct);
router.delete("/:id", validateToken, role(["Admin"]), productController.deleteProduct);
router.post("/:id/increase", validateToken, role(["Admin"]), productController.increaseStock);
router.post("/:id/decrease", validateToken, role(["Admin"]), productController.decreaseStock);
router.get("/low/threshold", validateToken, role(["Admin"]), productController.getLowStockProducts);

module.exports = router;
