const express = require("express");
const { addToCart, getProductInCart, clearCart , deleteCart } = require("../controllers/cartController");
const { protect } = require("../controllers/authController")
const router = express.Router()

router.post("/addcart", addToCart);
router.get("/getcart/:id", getProductInCart);
router.delete("/clearcart", clearCart);
router.delete("/removecart/:id", deleteCart);

module.exports = router