import React from 'react';
import { AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Box from '@mui/system/Box';

const dummyArray = [
    { title: "Dunki" },
    { title: "Animal" },
    { title: "Dimag Kharab" }
];

const Header = () => {

        const [value, setValue] = React.useState(0);
    return (
        <AppBar sx={{bgcolor: "#008080"}} >
            <Toolbar>
                <Box width={"30%"}>
                    <MovieFilterIcon />
                </Box>
                <Box width={"30%"} margin={"auto"} >
                    <Autocomplete
                        freeSolo
                        options={dummyArray.map((option) => option.title)}
                        renderInput={(params) => <TextField
                        sx={{input: {color: "white"}}} 
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
                        <Tab label="Movies" />
                        <Tab label="Admin" />
                        <Tab label="Auth" />
                </Tabs>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
