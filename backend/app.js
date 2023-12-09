import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/user', userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
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
