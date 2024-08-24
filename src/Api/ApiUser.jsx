import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL
const token = localStorage.getItem('authToken');

export const getUserList = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            );
        return response.data;
    } catch (e) {
        console.error("Eror Fetching Data User", e)
        throw e;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(
            `${baseLink}/api/users/${id}`
        );
        console.log(response);
        return response.data;
    } catch (e) {
        console.error("Eror Delete Data User", e)
        throw e;
    }
}

export const searchUser = async (q) => {
    try {
        const response = await axios.get(
            `${baseLink}/public/api/users?username=${q}`
        );
        return response.data; // Returning the data property
    } catch (error) {
        console.error("Error searching User:", error);
    }
};