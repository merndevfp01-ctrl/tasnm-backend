const express = require('express');
require("./config/db.js");
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Database Connection
// connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));

app.use('/product', productRoutes)
app.use('/auth', authRoutes)
app.use('/cart', cartRoutes)

app.get('/', (req, res) => {
    res.json({message:"Backend is running.."})
})

app.listen(PORT,() => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})