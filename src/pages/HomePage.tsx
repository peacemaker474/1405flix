import { useCallback } from 'react';
import { useQueries } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetail from '../components/MovieDetail/MovieDetail';
import NowSlider from '../components/MovieSlider/NowSlider';
import PopularSlider from '../components/MovieSlider/PopularSlider';
import TopRatedSlider from '../components/MovieSlider/TopRatedSlider';
import UpcomingSlider from '../components/MovieSlider/UpcomingSlider';
import { getNowPlaying, getPopularMovie, getTopRatedMovie, getUpcomingMovie } from '../network/api';
import { makePath } from '../utiles/makeImagePath';
import LoadingPage from './LoadingPage';

const Wrapper = styled.div`
    padding-bottom: 200px;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const BannerTitle = styled.h2`
    font-size: 8rem;
    margin-bottom: 20px;
`;

const BannerOverView = styled.p`
    width: 50%;
    font-size: 2.5rem;
    padding-left: 5px;
    line-height: 4rem;
`;

const Sliders = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 300px;
`;

function HomePage() {
    const movieData = useQueries([
        {
            queryKey: ['movies', 'nowPlaying'],
            queryFn: () => getNowPlaying(),
            staleTime: 1800 * 1000
        },
        {
            queryKey: ["movies", "popular"],
            queryFn: () => getPopularMovie(),
            staleTime: 1800 * 1000
        },
        {
            queryKey: ["movies", "topRated"],
            queryFn: () => getTopRatedMovie(),
            staleTime: 1800 * 1000
        },
        {
            queryKey: ["movies", "upComing"],
            queryFn: () => getUpcomingMovie(),
            staleTime: 1800 * 1000
        }
    ]);

    const isLoading = movieData?.some((data) => data.isLoading);

    const navigate = useNavigate();
    const offset = 6;
    const detailMatch = useMatch("/movies/:movieId");

    const handleMoveDetail = useCallback((movieId: string) => () => {
        navigate(`/movies/${movieId}`);
    }, [navigate]);

    if (isLoading) return <LoadingPage />

    return (
        <Wrapper>
            <Banner bgPhoto={makePath(movieData[0].data.results[0].backdrop_path || "")}>
                <BannerTitle> {movieData[0].data.results[0].title} </BannerTitle>
                <BannerOverView> {movieData[0].data.results[0].overview} </BannerOverView>
            </Banner>
            <Sliders>
                <NowSlider
                    movieData={movieData[0].data ? movieData[0].data?.results.slice(1) : []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                />
                <PopularSlider
                    movieData={movieData[1].data ? movieData[1].data?.results : []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                />
                <UpcomingSlider
                    movieData={movieData[3].data ? movieData[3].data?.results : []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                />
                <TopRatedSlider
                    movieData={movieData[2].data ? movieData[2].data?.results : []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                />
            </Sliders>
            {detailMatch && <MovieDetail detailLayout={detailMatch.params.movieId || ""} />}
        </Wrapper>
    );
}

export default HomePage;