const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes.js')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Database Connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));

app.use('/product', productRoutes)
app.use('/auth', authRoutes)

app.listen(PORT,() => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})