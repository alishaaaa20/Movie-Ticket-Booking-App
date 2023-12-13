import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = React.useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return ( 
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        padding={2}
        variant={"h4"}
        color={"#008080"}
        width={"30%"}
        textAlign={"center"}
        bgcolor={"#f0f8ff"}
        borderRadius={3}
        boxShadow={3}
        fontSize={"2rem"}
        fontWeight={"bold"}
      >
        All Movies
      </Typography>

      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        margin={"auto"}
        marginTop={4}
      >
        {movies && movies.map((movie, index) => (
          <MovieItem
            id={movie._id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            releaseDate={movie.releaseDate}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Movies;
