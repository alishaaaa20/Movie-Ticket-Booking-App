import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async (req, res, next) => {
    
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(500).json({ message: "Could not find any users" });
    }

    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (
        (!name && name.trim() === "") &&
        (!email && email.trim() === "") &&
        (!password && password.trim() === "")
    ) {
        return res.status(422).json({ message: "Invalid inputs" });
    }
      
    const hashPassword =  bcrypt.hashSync(password);
    let user;
    try {
        user = new User ({ name, email, password: hashPassword });
        user = await user.save();
    }
    catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Could not create user" });
    }

    return res.status(201).json({ user });
}

export const updateUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const id = req.params.id;

    const hashPassword =  bcrypt.hashSync(password);

    if (
        (!name && name.trim() === "") &&
        (!email && email.trim() === "") &&
        (!password && password.trim() === "")
    ) {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: hashPassword });
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({ message: "Something went wrong." });
    }

    res.status(200).json({ message: "User updated" });

};

export const deleteUser = async (req, res, next) => {
     const id = req.params.id;

    let user;
    try{
        user = await User.findByIdAndDelete(id);
    }
    catch(err){
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong." });
    }
    return res.status(200).json({ message: "User deleted" });

};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (
        (!email && email.trim() === "") &&
        (!password && password.trim() === "")
    ) {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(500).json({ message: "Unable to find user" });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
     
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
        expiresIn: "10d",
    });
    return res.status(200).json({ message: "User logged in", token, id: existingUser._id });
      
};

export const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;

    let bookings;

    try {
        bookings = await Bookings.find({ user: id });
    } catch (err) {
       return console.error(err);
    }

    if (!bookings) {
        return res.status(404).json({ message: "Unable to find booking" });
    }
    return res.status(200).json({ bookings });
};