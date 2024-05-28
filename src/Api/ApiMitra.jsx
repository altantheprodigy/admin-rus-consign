import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL

export const getMitraList = async () => {
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

export const deleteMitra = async (id) => {
    try {
        const response = await axios.delete(
            `${baseLink}/api/mitras/${id}`
        );
        return response.data
    } catch (e) {
        console.error("Eror Delete Mitra", e)
        throw e;
    }
}

export const searchMitra = async (q) => {
    try {
        const response = await axios.get(
            `${baseLink}/public/api/mitra?username=${q}`
        );
        return response.data
    } catch (e) {
        console.error("Eror searching Mitra", e);
        throw e
    }
}