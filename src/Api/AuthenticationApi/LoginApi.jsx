import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL


export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${baseLink}/api/loginadmin`,
            {
                email,
                password
            }
        );
        return response.data
    } catch (e) {
        console.error("eror login", e)
        throw e;
    }
}