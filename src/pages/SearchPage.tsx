import { useQueries } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { getSearchMovie, getSearchTV } from "../network/api";

import styled from "styled-components";
import LoadingPage from "./LoadingPage";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import TVDetail from "../components/TVDetail/TVDetail";
import SearchMovie from "../components/Search/SearchMovie";
import SearchTVShows from "../components/Search/SearchTVShows";
import { useCallback, useEffect } from "react";

const SearchWrapper = styled.div`
    width: 100%;
    margin-top: 15vh;
`;


type Keyword = string | null;

function SearchPage() {
    const location = useLocation();
    const keyword: Keyword = new URLSearchParams(location.search).get("keyword");
    const movieMatch = useMatch("/search/movie/:movieId");
    const tvShowMatch = useMatch("/search/tvShows/:tvId");
    const navigate = useNavigate();
    const searchData = useQueries([
        {
            queryKey: ['search', 'movies'],
            queryFn: () => getSearchMovie(keyword || ""),
            cacheTime: 0,
        },
        {
            queryKey: ['search', 'TVShow'],
            queryFn: () => getSearchTV(keyword || ""),
            cacheTime: 0,
        }
    ]);

    const isLoading = searchData.some((data) => data.isLoading);

    const handleMovieDetail = useCallback((movieId: string) => () => {
        navigate(`/search/movie/${movieId}`)
    }, [navigate]);

    const handleTVDetail = useCallback((tvId: string) => () => {
        navigate(`/search/tvShows/${tvId}`)
    }, [navigate]);

    useEffect(() => {
        searchData[0].refetch();
        searchData[1].refetch();
    }, [keyword])

    if (isLoading) return <LoadingPage />


    return (
        <SearchWrapper>
            <SearchMovie
                searchMovieData={searchData[0].data?.results || []}
                handleMovieDetail={handleMovieDetail}
                keyword={keyword || ""}
            />
            <SearchTVShows
                searchTVData={searchData[1].data?.results || []}
                handleTVDetail={handleTVDetail}
                keyword={keyword || ""}
            />
            {movieMatch && <MovieDetail detailLayout={movieMatch.params.movieId || ""} />}
            {tvShowMatch && <TVDetail detailLayout={tvShowMatch.params.tvId || ""} />}
        </SearchWrapper>
    );
}

export default SearchPage;