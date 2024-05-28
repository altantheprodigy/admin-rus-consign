import axios from "axios";



const apikey = import.meta.env.VITE_APP_APIKEY;
const baseUrl = import.meta.env.VITE_APP_BASELINK;
const baseLink = import.meta.env.VITE_APP_BASEURL

export const getMovieList = async () => {
    try {
        const response = await axios.get(
            `${baseUrl}/movie/popular?api_key=${apikey}`
        );
        return response.data; // Returning the entire response data
    } catch (error) {
        console.error("Error fetching movie list:", error);
        throw error; // Re-throwing the error to be handled by the caller
    }
};


export const searchMovie = async (q) => {
    try {
        const response = await axios.get(
            `${baseUrl}/search/movie?query=${q}&api_key=${apikey}`
        );
        return response.data; // Returning the data property
    } catch (error) {
        console.error("Error searching movie:", error);
    }
};

export const getProduk = async () => {
    try {
        const response = await axios.get(
            `${baseLink}/api/product`
        );
        return response.data;
    } catch (e) {
        console.error("Eror Fetching Product")
    }
}