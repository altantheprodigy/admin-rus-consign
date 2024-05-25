import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL

export const getUserList = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/users`);
        return response.data;
    } catch (e) {
        console.error("Eror Fetching Data User", e)
        throw e;
    }
}