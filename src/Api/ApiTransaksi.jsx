import axios from "axios";

const baseLink = import.meta.env.VITE_APP_BASEURL
const token = localStorage.getItem('authToken');

export const getTransaksiList = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/cods/status/selesai`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (e) {
        console.error("eror fetching Data Transaksi ", e)
        throw e;
    }
}