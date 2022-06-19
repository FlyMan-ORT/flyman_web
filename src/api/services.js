import axios from 'axios';
const token = window.sessionStorage.getItem('token');

const getAllServices = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/services/`
    try {
        const response = await axios.get(url, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export { getAllServices }