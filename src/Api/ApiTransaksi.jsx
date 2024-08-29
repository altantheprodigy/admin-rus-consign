import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL
const token = localStorage.getItem('authToken');

export const getTransaksiList = async (status) => {
    try {
        const response = await axios.get(
            `${baseLink}/api/cods/status/${status}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (e) {
        console.error("Error fetching Data Transaksi ", e)
        throw e;
    }
}
