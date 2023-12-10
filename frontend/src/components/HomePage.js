import React from 'react'
import { Box } from '@mui/material';
import theme from '../assets/theme.png'


const HomePage = () => {
    return (
        <Box width="100%" height="100%" margin="auto">
        <Box width="100%" padding={0}>
            <img src={theme} alt="" style={{ width: '100%', height: "500px", objectFit: 'cover' }} />
        </Box>
    </Box>
    )
}

export default HomePage;