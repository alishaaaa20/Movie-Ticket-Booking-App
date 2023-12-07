import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use("/user", userRouter);

// Connect to MongoDB
mongoose.set('useNewUrlParser', true); 
mongoose.set('useUnifiedTopology', true);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB database connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
    }
};

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
});