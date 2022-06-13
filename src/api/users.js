import axios from 'axios';

const getMaintenanceUsers = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/users`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const createNewUser = async (user) => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/register`
    try {
        const response = await axios.post(url, user);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const updateOneUser = async (userId, user) => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/${userId}`
    try {
        const response = await axios.patch(url, user);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const deleteOneUser = async (userId) => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/${userId}`
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export { getMaintenanceUsers, createNewUser, updateOneUser, deleteOneUser }