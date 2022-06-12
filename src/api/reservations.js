import axios from 'axios';

const getAllReservations = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/reservations/`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const createReserve = async (reservation) => {
    const url = `${process.env.REACT_APP_BASE_URL}/reservations/`
    try {
        const response = await axios.post(url, reservation);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export { getAllReservations, createReserve }