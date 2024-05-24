import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL

export const getUserList = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/mitra`
        );
        return response.data;
    } catch (error){
        console.error("Eror Fetching Data User", error);
        throw error
    }
}