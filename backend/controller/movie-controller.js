import jwt from "jsonwebtoken";
import Movie from "../models/movie.js";

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(401).json({ message: "Token not found" });
    }

    let adminId;

    // verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(401).json({ message: "Token invalid" });
        }

        adminId = decrypted.id;
        return;
    });

    // if token is valid, add movie
    const { title, description, actors, releaseDate, posterUrl, featured } = req.body;

    if (!title.trim() && !description.trim() && !releaseDate.trim() && !posterUrl.trim()) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    let movie;

    try {
        movie = new Movie({
            title,
            description,
            actors,
            releaseDate: new Date(releaseDate),
            posterUrl,
            featured,
            admin: adminId,
        });
        movie = await movie.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }

    if (!movie) {
        return res.status(500).json({ message: "Failed to save the movie" });
    }

    return res.status(201).json({ movie });
};

export const getAllMovies = async (req, res, next) => {
    let movies;

    try {
        movies = await Movie.find({});
    } catch (err) {
       return console.error(err);
        
    }

    if (!movies) {
        return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
    const id = req.params.id;

    let movie;

    try {
        movie = await Movie.findById(id);
    } catch (err) {
        return console.error(err);
    }

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ movie });
};
