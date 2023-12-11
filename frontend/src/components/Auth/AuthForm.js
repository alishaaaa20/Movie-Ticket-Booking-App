import React from 'react';
import { Dialog, Typography, Button } from '@mui/material';
import { Box } from '@mui/material';
import { FormLabel } from '@mui/material';
import { TextField } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';


const labelStyle = {mt: 1, mb: 1};
const AuthForm = ({onSubmit, isAdmin}) => {

    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
        name: "",
    });

    const [isSignup, setIsSignup] = React.useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({inputs, signp: isAdmin ? false : isSignup });
    };
  return (
    <Dialog PaperProps={{ style: { borderRadius:20 } }} open={true}>
        <Box sx={{ml: "auto", padding: 1}}>
            <IconButton>
            <CloseRoundedIcon />
            </IconButton>
            </Box>
        <Typography variant="h4" textAlign={"center"} color={"#008080"} fontWeight={"bold"} padding={2}>
            {isSignup ? "Signup" : "Login" }
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box 
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            margin="auto"
            width={400}
            padding={6}
            >
            {!isAdmin && isSignup && (
                <>
                {" "}
                <FormLabel sx={labelStyle} htmlFor="name">Name</FormLabel>
            <TextField 
            value={inputs.name}
            onChange={handleChange}
            margin="normal" 
            variant="standard"
             type="name" 
             name="name" />
                </>
            )}
            
            <FormLabel sx={labelStyle} htmlFor="email">Email</FormLabel>
            <TextField 
            value={inputs.email}
            onChange={handleChange}
            margin="normal" 
            variant="standard" 
            type="email" 
            name="email" />
            <FormLabel sx={labelStyle} htmlFor="password">Password</FormLabel>
            <TextField
                value={inputs.password}
                onChange={handleChange}
             margin="normal" 
             variant="standard" 
             type="password" 
             name="password" />

            <Button variant="contained" type="submit" sx={{mt: 2, bgcolor: "#008080", borderRadius: 10}}>
                {isSignup ? "Signup" : "Login" }
            </Button>
           {!isAdmin && (
            <Button  
            onClick={() => setIsSignup(!isSignup)}
            sx={{mt: 2, borderRadius: 10}} fullWidth>Switch To {isSignup ? "Login" : "Signup" } </Button>

           )} 
            </Box>

        </form>

    </Dialog>
  )
}

export default AuthForm