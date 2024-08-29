import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL
const token = localStorage.getItem('authToken');

export const getMitraList = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/mitra`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
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

export const rejectMitra = async (id) => {
    try {
        const response = await axios.delete(
            `${baseLink}/api/reject/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error Reject Mitra:", error);
        throw error;
    }
}

export const deleteMitra = async (id) => {
    try {
        const response = await axios.delete(
            `${baseLink}/api/mitras/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
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
            `${baseLink}/api/mitra?nama_toko=${q}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data
    } catch (e) {
        console.error("Eror searching Mitra", e);
        throw e
    }
}