import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    actors: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    posterURL: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
    },
    bookings: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);