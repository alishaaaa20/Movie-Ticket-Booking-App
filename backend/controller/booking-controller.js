import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/movie.js";
import User from "../models/user.js";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (err) {
      return  console.error(err);
    }
    if (!existingMovie) {
        return res.status(404).json({ message: "Movie  not found" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    let booking;
    try {
        booking = new Bookings({ // Change variable name here
            movie,
            date: new Date(date),
            seatNumber,
            user,
        });

       const session = await mongoose.startSession();
         session.startTransaction();
            existingUser.bookings.push(booking);
            existingMovie.bookings.push(booking);
            await existingUser.save({ session: session });
            await existingMovie.save({ session: session });
            await booking.save({ session });
            session.commitTransaction();

    } catch (err) {
        console.error(err); 
        return res.status(500).json({ message: "Failed to save the booking" });
    }

    if (!booking) {
        return res.status(500).json({ message: "Failed to save the booking" });
    }

    return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
     const id = req.params.id;

        let booking;
        try {
            booking = await Bookings.findById(id);
        } catch (err) {
            console.error(err);
        }

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json({ booking });

};

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;

    let booking;

    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user movie");
        console.log(booking);

        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({ session });
        await booking.movie.save({ session });
        session.commitTransaction();

    } catch (err) {
        console.error(err);
    }

    if (!booking) {
        return res.status(404).json({ message: "Unable to delete" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
};