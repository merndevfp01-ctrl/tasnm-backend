const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductsById,
  editProduct,
  deleteProduct
} = require('../controllers/productController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/createproduct', upload.single('image'), createProduct);
// router.post('/createproduct', createProduct)
router.get('/getproduct', getAllProducts);
router.get('/getproduct/:id', getProductsById);
router.put('/editproduct/:id', editProduct);
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;
