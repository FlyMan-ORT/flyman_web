import axios from 'axios';

// const BASE_URL = 'http://192.168.68.110:3000'; // Leo
// const BASE_URL = 'http://192.168.68.110:3000'; // Fer P
// const BASE_URL = 'http://192.168.68.110:3000'; // Lucho
// const BASE_URL = 'http://192.168.68.110:3000'; // Fer M
const BASE_URL = 'http://192.168.0.4:3000'; // Eze

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

export { login }