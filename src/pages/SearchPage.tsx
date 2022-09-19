import { useQueries } from "react-query";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { getSearchMovie, getSearchTV, IMovie, ITVShow } from "../network/api";

import styled from "styled-components";
import { makePath } from "../utiles/makeImagePath";
import LoadingPage from "./LoadingPage";
import { ToggleBtn } from "../styles/Slider/wrapper";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import TVDetail from "../components/TVDetail/TVDetail";

const SearchWrapper = styled.div`
    width: 100%;
    margin-top: 15vh;
`;

const SearchMovies = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const SearchTitle = styled.h1`
    font-size: 3rem;
`;

const SearchSubTitle = styled.span`
    color: rgba(127, 127, 127, .9);
    padding-right: 15px;
`;

const SearchKeyword = styled.span`
`;

const SearchLists = styled.ul`
    width: 100%;
    display: flex;
    gap: 50px;
    justify-content: center;
    flex-wrap: wrap;


    @media ${({ theme }) => theme.device.extraLarge} {
        justify-content: flex-start;
    }
`;

const SearchList = styled(motion.li)`
    width: 350px;
    height: 250px;
    border-radius: 5px;
    overflow: hidden;

    img {
        width: 100%;
        height: 250px;
    }
`;

const SearchInfoBox = styled(motion.div)`
    width: 100%;
    height: 75px;

    display: none;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(17, 18, 28, .7);

    position: relative;

    h3 {
        font-size: 2rem;
        padding-left: 20px;
    }

    div {
        margin-right: 10px;
        cursor: pointer;
    }
`;

const SearchTVShows = styled.div`
    width: 95%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const listVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -75,
        boxShadow: "rgba(247, 247, 247, 0.1) 0px 1px 4px, rgb(247, 247, 247) 0px 0px 0px 0px",
        transition: {
            delay: 0.7,
            duration: 0.3,
            type: "tween",
        }
    }
}

const imgVariants = {
    normal: {
        height: 250,
    },
    hover: {
        height: 175,
        transition: {
            delay: 0.7,
            duration: 0.3,
        }
    }
}

const infoVariants = {
    hover: {
        display: "flex",
        transition: {
            delay: 0.7,
            duration: 0.3,
        }
    }
}

function SearchPage() {
    const [search] = useSearchParams();
    const movieMatch = useMatch("/search/movie/:movieId");
    const tvShowMatch = useMatch("/search/tvShows/:tvId");
    const navigate = useNavigate();
    const searchData = useQueries([
        {
            queryKey: ['search', 'movies'],
            queryFn: () => getSearchMovie(search.get('keyword')!),
        },
        {
            queryKey: ['search', 'TVShow'],
            queryFn: () => getSearchTV(search.get('keyword')!),
        }
    ]);

    const isLoading = searchData?.some((data) => data.isLoading);

    const handleMovieDetail = (movieId: string) => () => navigate(`/search/movie/${movieId}`);
    const handleTVDetail = (tvId: string) => () => navigate(`/search/tvShows/${tvId}`);

    if (isLoading) return <LoadingPage />

    return (
        <SearchWrapper>
            <AnimatePresence>
                <SearchMovies>
                    <SearchTitle>
                        <SearchSubTitle>다음과 관련된 영화 콘텐츠:</SearchSubTitle>
                        <SearchKeyword>{search.get("keyword")}</SearchKeyword>
                    </SearchTitle>
                    <SearchLists>
                        {searchData && searchData[0]?.data.results.map((list: IMovie) => (
                            <SearchList key={list.id} variants={listVariants} initial="normal" whileHover="hover" transition={{ type: "tween" }}>
                                <motion.img variants={imgVariants} src={makePath(list.backdrop_path ? list.backdrop_path : list.poster_path, "w500")} />
                                <SearchInfoBox variants={infoVariants}>
                                    <h3> {list.title} </h3>
                                    <ToggleBtn onClick={handleMovieDetail(list.id + "")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                    </ToggleBtn>
                                </SearchInfoBox>
                            </SearchList>
                        ))}
                    </SearchLists>
                </SearchMovies>
            </AnimatePresence>
            <SearchTVShows>
                <SearchTitle>
                    <SearchSubTitle>다음과 관련된 TV 콘텐츠:</SearchSubTitle>
                    <SearchKeyword>{search.get("keyword")}</SearchKeyword>
                </SearchTitle>
                <SearchLists>
                    {searchData && searchData[1]?.data.results.map((list: ITVShow) => (
                        <SearchList key={list.id} variants={listVariants} initial="normal" whileHover="hover" transition={{ type: "tween" }}>
                            <motion.img variants={imgVariants} src={makePath(list.backdrop_path ? list.backdrop_path : list.poster_path, "w500")} />
                            <SearchInfoBox variants={infoVariants}>
                                <h3> {list.name} </h3>
                                <ToggleBtn onClick={handleTVDetail(list.id + "")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                </ToggleBtn>
                            </SearchInfoBox>
                        </SearchList>
                    ))}
                </SearchLists>
            </SearchTVShows>
            {movieMatch && <MovieDetail detailLayout={movieMatch.params.movieId || ""} />}
            {tvShowMatch && <TVDetail detailLayout={tvShowMatch.params.tvId || ""} />}
        </SearchWrapper>
    );
}

export default SearchPage;