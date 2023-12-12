import React, { useEffect } from 'react';
import { AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Box from '@mui/system/Box';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';

/* const dummyArray = [
    { title: "Dunki" },
    { title: "Animal" },
    { title: "Dimag Kharab" }
]; */

const Header = () => {

    const [value, setValue] = React.useState(0);
    const [movies, setMovies] = React.useState([]);
    useEffect(() => {
        getAllMovies()
            .then(data => {
                console.log(data.movies); 
                setMovies(data.movies);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <AppBar position='sticky' sx={{ bgcolor: "#008080" }} >
            <Toolbar>
                <Box width={"30%"}>
                    <MovieFilterIcon />
                </Box>
                <Box width={"30%"} margin={"auto"} >
                    <Autocomplete
                        freeSolo
                        options={movies && movies.map((option) => option.title)}
                        renderInput={(params) => <TextField
                            sx={{ input: { color: "white" } }}
                            variant='standard'
                            {...params} label="Search movies here..."
                            InputLabelProps={{ sx: { color: 'white' } }}

                        />}
                    />
                </Box>

                <Box display={"flex"} >
                    <Tabs
                        textColor='inherit'
                        indicatorColor='secondary'
                        value={value}
                        onChange={(e, val) => setValue(val)}>
                        <Tab label="Movies" LinkComponent={Link} to="/movies" />
                        <Tab label="Admin" LinkComponent={Link} to="/admin"  />
                        <Tab label="Login" LinkComponent={Link} to="/auth"  />
                    </Tabs>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
