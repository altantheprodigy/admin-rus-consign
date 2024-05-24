import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL

export const getUserList = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/mitra`
        );
        return response.data;
    } catch (error) {
        console.error("Error Fetching Data User", error);
        throw error;
    }
}

export const acceptUser = async (id) => {
    try {
        const response = await axios.put(
            `${baseLink}/api/accept/${id}`
        );
        return response.data; // Assuming the response contains accepted user data
    } catch (error) {
        console.error("Error accepting user:", error);
        throw error;
    }
}