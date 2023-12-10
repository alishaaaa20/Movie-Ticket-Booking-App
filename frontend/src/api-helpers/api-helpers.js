import axios from 'axios';

export const getAllMovies = async () => {
    try {
        const response = await axios.get('http://localhost:5000/movie');

        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Request failed with status ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        return null;
    }
};
