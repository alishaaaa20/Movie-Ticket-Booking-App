import Bookings from "../models/Bookings";

export const newBooking = async (req, res, next) => {
    const { movie, date, time, seatNumber, user, price } = req.body;

    let booking;
    try {
        booking = new Bookings({ // Change variable name here
            movie,
            date: new Date(date),
            time,
            seatNumber,
            user,
            price,
        });
        booking = await booking.save(); // Change variable name here
    } catch (err) {
        console.error(err); // Use console.error for logging errors
        return res.status(500).json({ message: "Failed to save the booking" });
    }

    if (!booking) {
        return res.status(500).json({ message: "Failed to save the booking" });
    }

    return res.status(201).json({ booking });
};
