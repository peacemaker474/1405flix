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

export interface IVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}