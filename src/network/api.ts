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

// 메인페이지 영화 목록 가져오기

export const getNowPlaying = async () => {
    const { data } = await api.get("/movie/now_playing");

    return data;
};

export const getPopularMovie = async () => {
    const { data } = await api.get("/movie/popular");

    return data;
};

export const getTopRatedMovie = async () => {
    const { data } = await api.get("/movie/top_rated");

    return data;
};

export const getUpcomingMovie = async () => {
    const { data } = await api.get("/movie/upcoming");

    return data;
};

// 영화 상세페이지 데이터 가져오기

export const getDetailMovie = async (movieId: string) => {
    const { data } = await api.get(`/movie/${movieId}`);

    return data;
};

export const getMovieVideos = async (movieId: string) => {
    const { data } = await api.get(`/movie/${movieId}/videos`);

    return data;
};

// TV 시리즈 페이지 데이터 가져오기

export const getOnAirTVShow = async () => {
    const { data } = await api.get("/tv/on_the_air");

    return data;
};

export const getAiringTVShow = async () => {
    const { data } = await api.get("/tv/airing_today");

    return data;
};

export const getTopRatedTVShow = async () => {
    const { data } = await api.get("/tv/top_rated");

    return data;
};

export const getPopularTVShow = async () => {
    const { data } = await api.get("/tv/popular");

    return data;
};

// TV 시리즈 상세 페이지 데이터 가져오기

export const getDetailTVs = async (tvId: string) => {
    const { data } = await api.get(`/tv/${tvId}`);

    return data;
};

export const getTVsVideo = async (tvId: string) => {
    const { data } = await api.get(`/tv/${tvId}/videos`);

    return data;
};

// 검색 결과 받아오기

export const getSearchMovie = async (query: string) => {
    if (query) {
        const { data } = await api.get(`/search/movie?query=${query}`);

        return data;
    }
}

export const getSearchTV = async (query: string) => {
    if (query) {
        const { data } = await api.get(`/search/tv?query=${query}`);

        return data;
    }
}