import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { Typography, Box, FormLabel, TextField, Button } from '@mui/material';

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [bookingData, setBookingData] = useState({
    seatNumber: '',
    date: '',
  });

  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Data:', bookingData);
    newBooking({ ...bookingData, movie: movie._id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="Montserrat"
            variant="h4"
            textAlign="center"
          >
            Book Tickets for {movie.title}
          </Typography>

          <Box display="flex" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              width="50%"
              paddingTop={3}
              marginRight="auto"
            >
              <img
                width="60%"
                height="400px"
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width="80%" marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography marginTop={1} fontWeight="bold">
                    Starrers:
                    {movie.actors.map((actor) => (
                        <span key={actor}> {actor} </span>
                    ))}
                </Typography>
                <Typography marginTop={1} fontWeight="bold">
                    Genre:
                    {movie.genre.map((genre) => (
                        <span key={genre}> {genre} </span>
                    ))}
                </Typography>
                <Typography marginTop={1} fontWeight="bold">
                  Release Date:
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
                <Typography marginTop={1} fontWeight="bold">
                  Duration: {movie.duration}
                </Typography>
                <Typography marginTop={1} fontWeight="bold">
                  Price: Rs. {movie.price}
                </Typography>
              </Box>
            </Box>

            <Box width="50%" paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  margin="auto"
                  padding={5}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    type="number"
                    variant="standard"
                    margin="normal"
                    value={bookingData.seatNumber}
                    onChange={handleChange}
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    variant="standard"
                    margin="normal"
                    value={bookingData.date}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: 3, bgcolor: "#008080" }}
                  >
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
