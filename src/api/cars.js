import axios from 'axios';

const getAllCars = async () => {
    const token = sessionStorage.getItem('token');
    const url = `${process.env.REACT_APP_BASE_URL}/cars/`
    if (token) {
        try {
            const response = await axios.get(url, { headers: { 'authorization': `Bearer ${token}` } });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
}

export { getAllCars }