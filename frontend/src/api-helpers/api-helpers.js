import axios from 'axios';

export const getAllMovies = async () => {
    try {
        const response = await axios.get('/movie');

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

export const sendUserAuthRequest = async (data, signup) => {
  const res = await  axios.post(`/user/${signup ? 'signup' : 'login'}`, {
        name: signup ? data.name : "",
        email: data.email,
        password: data.password
    }).catch((err) => console.log(err));

    if(res.status !== 200 && res.status !== 201){
        console.log("Unexpected Error Occured!");
    }
    const resData = await res.data;
    return resData;
};

export const sendAdminAuthRequest = async (data, signup) => {
    const res = await axios.post("/admin/login", {
        email: data.email,
        password: data.password
    }).catch((err) => console.log(err));

    if(res.status !== 200 && res.status !== 201){
        console.log("Unexpected Error Occured!");
    }
    const resData = await res.data;
    return resData;
}