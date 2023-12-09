import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: { 
        type: String,
        required: true,
        minLength: 6,
    },
    addedMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    }],
})

export default mongoose.model("Admin", adminSchema);