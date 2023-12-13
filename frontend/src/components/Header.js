import React, { useEffect } from 'react';
import { AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Box from '@mui/system/Box';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { adminActions } from '../store';


const Header = () => {

  const dispatch = useDispatch();  
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
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

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    }

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

                        {!isAdminLoggedIn && !isUserLoggedIn && (
                            <>
                                <Tab label="Admin" LinkComponent={Link} to="/admin"  />
                                <Tab label="Login" LinkComponent={Link} to="/auth"  />
                            </>
                        )}

                    {isUserLoggedIn && (
                        <>
                            <Tab label="Profile" LinkComponent={Link} to="/user" />
                            <Tab 
                                onClick={() => logout(false)}
                            label="Logout" LinkComponent={Link} to="/" />
                        </>
                    )}


                   {isAdminLoggedIn && (
                        <>
                            <Tab label="Profile" LinkComponent={Link} to="/admin" />
                            <Tab label="Add Movie" LinkComponent={Link} to="/add" />
                            <Tab 
                                onClick={() => logout(false)}
                            label="Logout" LinkComponent={Link} to="/" />
                        </>
                    )}
                    </Tabs>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
