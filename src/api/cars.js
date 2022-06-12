import axios from 'axios';

const getAllCars = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/cars/`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export { getAllCars }