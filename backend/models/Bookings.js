import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema ({

    movie: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}); 

export default mongoose.model("Booking", bookingSchema);