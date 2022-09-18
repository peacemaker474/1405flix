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
    const { data } = await api.get(`/movie/${parseInt(movieId)}`);

    return data;
};

export const getMovieVideos = async (movieId: string) => {
    const { data } = await api.get(`/movie/${parseInt(movieId)}/videos`);

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

// 타입 선언, 추후 이동 및 안 쓰는 거 삭제

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

export interface ITVShow {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface IEpisode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

interface INetworks {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
}

interface IGenres {
    id: number;
    name: string;
}

interface IProduction {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ISeasons {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

interface ICreateBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

export interface ITVDetailInfo {
    adult: boolean;
    backdrop_path: string;
    created_by: ICreateBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: IGenres[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: IEpisode;
    name: string;
    next_episode_to_air: IEpisode;
    networks: INetworks[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProduction[];
    seasons: ISeasons[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}