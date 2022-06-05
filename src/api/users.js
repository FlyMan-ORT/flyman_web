import axios from 'axios';
import { BASE_URL } from '../utils/connections';


const login = async (email, password) => {
    const url = `${BASE_URL}/users/login`
    let response;
    try {
        response = await axios.post(url, { email, password });
    } catch (error) {
        throw error;
    }

    return response.data;
}

const getMaintenanceUsers = async () => {
    const url = `${BASE_URL}/users`
    let response;
    try {
        response = await axios.get(url);
    } catch (error) {
        throw error;
    }

    return response.data;
}


export { login, getMaintenanceUsers }