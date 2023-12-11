import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

const MovieItem = ({ title, posterUrl, releaseDate, id }) => {
  return (
    <Card sx={{ 
      margin: 5,
      width: 300, 
      height: 380,
      borderRadius: 3,
      boxShadow: 3,
      ":hover": {
        boxShadow: '10px 10px 20px #ccc',
      }
    }}>
      <img height={"50%"} width={"100%"} src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" sx={{ margin: "auto", color: "#008080" }}>
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieItem;
