
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f78b4.firebaseio.com/'
});

export default instance;