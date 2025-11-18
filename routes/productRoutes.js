const express = require('express');
const {
  createProduct,
  getAllProducts,
  getAllProductsAdmin,
  getProductsById,
  editProduct,
  softDeleteProduct,
  restoreProduct
} = require('../controllers/productController');
const upload = require('../middleware/upload');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.post('/createproduct', protect, upload.single('image'), createProduct);
router.get('/getproduct', protect, getAllProducts);
router.get('/getproductadmin', protect, getAllProductsAdmin);
router.get('/getproduct/:id', protect, getProductsById);
router.put('/editproduct/:id', protect, upload.single('image'), editProduct);
router.put('/deleteproduct/:id', protect, softDeleteProduct);
router.get('/deletedproducts', protect, softDeleteProduct);
router.put('/restoreProduct/:id', protect, restoreProduct)

module.exports = router;
