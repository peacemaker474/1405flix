import axios from 'axios';

const API_KEY = "a9dc1bd31af50bb46c99983404356308";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: API_KEY,
        language: "ko",
        region: "kr",
    }
});

export interface IMovie {
    backdrop_path: string;
    poster_path: string;
    id: number;
    title: string;
    overview: string;
}

export interface INowPlaying {
    dates: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export const getNowPlaying = async () => {
    const { data } = await api.get("/movie/now_playing");

    return data;
}