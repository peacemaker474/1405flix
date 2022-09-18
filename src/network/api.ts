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
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
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
};

export const getDetailMovie = async (movieId: string) => {
    const { data } = await api.get(`/movie/${parseInt(movieId)}`);

    return data;
};

export const getMovieVideos = async (movieId: string) => {
    const { data } = await api.get(`/movie/${parseInt(movieId)}/videos`);

    return data;
};

export const getPopularMovie = async () => {
    const { data } = await api.get("/movie/popular");

    return data;
};

export const getTopRatedMovie = async () => {
    const { data } = await api.get("/movie/top_rated");

    return data;
}

export const getUpcomingMovie = async () => {
    const { data } = await api.get("/movie/upcoming");

    return data;
}