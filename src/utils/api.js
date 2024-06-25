import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const ZPLEX_API_URL = import.meta.env.ZPLEX_API_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};


export const fetchFromZplexApi = async (url) => {
    try {
        const { data } = await axios.get(ZPLEX_API_URL + url);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}