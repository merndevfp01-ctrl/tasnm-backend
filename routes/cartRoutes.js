const express = require("express");
const { addToCart, getProductInCart, clearCart , deleteCart, decreaseQuantity } = require("../controllers/cartController");
const { protect } = require("../controllers/authController")
const router = express.Router()

router.post("/addcart/:id", addToCart);
router.get("/getcart/:userId", getProductInCart);
router.delete("/clearcart", clearCart);
router.delete("/removecart/:id", deleteCart);
router.post("/decreaseQty/:id", decreaseQuantity);

module.exports = router