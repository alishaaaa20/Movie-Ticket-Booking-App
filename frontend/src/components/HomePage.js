import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieItem from './Movies/MovieItem';
import theme from '../assets/theme.png';
import theme1 from '../assets/theme2.jpg';
import theme2 from '../assets/theme3.jpg';
import theme3 from '../assets/theme4.jpg';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';

const HomePage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
    };

    const [movies, setMovies] = React.useState([]);
    useEffect(() => {
        getAllMovies()
        .then((data) => setMovies(data.movies))
        .catch((err) => console.log(err));
    }, []);
    console.log(movies);

    return (
        <Box width="100%" margin="auto">
            <Slider {...settings}>
                <Box width="100%" height={"70vh"} padding={0}>
                    <img src={theme} alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Box width="100%" height={"60vh"} padding={0}>
                    <img src={theme1} alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Box width="100%" height={"60vh"} padding={0}>
                    <img src={theme2} alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Box width="100%" height={"60vh"} padding={0}>
                    <img src={theme3} alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
            </Slider>

            <Box padding={10} textAlign="center" color="#008080">
                <Typography variant="h4">
                    Now Showing
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" flexWrap="wrap" width="100%">
                {movies && movies.slice(0,3).map((movie, index) => (
                    <MovieItem 
                    id={movie._id}
                    title={movie.title}
                    posterUrl={movie.posterUrl}
                    releaseDate={movie.releaseDate}
                    key={index} />
                ))}
            </Box>

            <Box padding={3} textAlign="center" color="#008080">
                <Button 
                LinkComponent={Link} to="/movies" 
                variant="outlined" 
                sx={{ color: "#008080" }}>
                    Show All Movies
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
