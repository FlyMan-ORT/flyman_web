import axios from 'axios';

const token = window.sessionStorage.getItem('token');

const getMaintenanceUsers = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/users`
    try {
        const response = await axios.get(url, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const createNewUser = async (user) => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/register`
    try {
        const response = await axios.post(url, user, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const updateOneUser = async (userId, user) => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/${userId}`
    try {
        const response = await axios.patch(url, user, { headers: { 'authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const deleteOneUser = async (userId) => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/${userId}`
    try {
        const response = await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export { getMaintenanceUsers, createNewUser, updateOneUser, deleteOneUser }