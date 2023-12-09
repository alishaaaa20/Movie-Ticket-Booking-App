import express from 'express';
import { addMovie } from '../controller/movie-controller';

const movieRouter = express.Router();

movieRouter.post("/", addMovie);

export default movieRouter;