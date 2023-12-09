import jwt from "jsonwebtoken";

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization?.split(" ")[1];

    if (!extractedToken || !extractedToken.trim()) {
        return res.status(401).json({ message: "Token not found" });
    }

    let adminId;

    // verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(401).json({ message: "Token invalid" });
        } else {
            adminId = decrypted.id;
        }
    });

    // if token is valid, add movie
    const { title, description, actors, releaseDate, posterUrl, featured } = req.body;

    if (!title && !title.trim() && !description && !description.trim() && !releaseDate && !releaseDate.trim() && !posterUrl && !posterUrl.trim()) {
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
        return res.status(500).json({ message: "Something went wrong." });
    }

    if (!movie) {
        return res.status(500).json({ message: "Failed to save the movie" });
    }

    return res.status(201).json({ movie });
};
