import { useCallback, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MovieDetail from "../Movies/MovieDetail/MovieDetail";
import TVDetail from "../TVs/TVDetail/TVDetail";
import SearchMovie from "./SearchMovie";
import SearchTVShows from "./SearchTVShows";

const SearchWrapper = styled.div`
    width: 100%;
    margin-top: 15vh;
`;


function Search({ searchData, keyword }: any) {
    const movieMatch = useMatch("/search/movie/:movieId");
    const tvShowMatch = useMatch("/search/tvShows/:tvId");
    const navigate = useNavigate();

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

export default Search;