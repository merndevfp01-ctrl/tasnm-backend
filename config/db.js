const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

module.exports = connectDB;