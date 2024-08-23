import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL


export const register = async (email, password) => {
    try {
        const response = await axios.post(
            `${baseLink}/api/registeradmin`,
            {
                email,
                password
            }
        );
        return response.data
    } catch (e) {
        console.error("eror Register", e)
        throw e;
    }
}