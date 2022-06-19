import axios from 'axios';

const token = window.sessionStorage.getItem('token');

const getAllReservations = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/reservations/`
    try {
        const response = await axios.get(url, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const createReserve = async (reservation) => {
    const url = `${process.env.REACT_APP_BASE_URL}/reservations/`
    try {
        const response = await axios.post(url, reservation, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const cancelReserve = async (id) => {
    const url = `${process.env.REACT_APP_BASE_URL}/reservations/${id}`
    try {
        const response = await axios.delete(url, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export { getAllReservations, createReserve, cancelReserve }