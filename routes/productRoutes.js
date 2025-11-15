const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductsById,
  editProduct,
  deleteProduct
} = require('../controllers/productController');
const upload = require('../middleware/upload');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.post('/createproduct', protect, upload.single('image'), createProduct);
router.get('/getproduct', getAllProducts);
router.get('/getproduct/:id', getProductsById);
router.put('/editproduct/:id', upload.single('image'), editProduct);
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;
