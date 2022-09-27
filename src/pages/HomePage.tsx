import { useCallback } from 'react';
import { useQueries } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetail from '../components/MovieDetail/MovieDetail';
import MoviesSlider from '../components/MovieSlider/MoviesSlider';
import { getNowPlaying, getPopularMovie, getTopRatedMovie, getUpcomingMovie } from '../network/api';
import { SliderTitle } from '../styles/Slider/wrapper';
import { makePath } from '../utiles/makeImagePath';
import LoadingPage from './LoadingPage';

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
        },
    ]);

    const isLoading = movieData?.some((data) => data.isLoading);

    const navigate = useNavigate();
    const offset = 6;
    const detailMatch = useMatch("/movies/:movieId");

    const handleMoveDetail = useCallback((movieId: string) => {
        navigate(`/movies/${movieId}`);
    }, [navigate]);

    if (isLoading) return <LoadingPage />

    return (
        <Wrapper>
            <Banner bgPhoto={makePath(movieData[0].data.results[0].backdrop_path || "")}>
                <SliderTitle> 지금 재생중인 영화 </SliderTitle>
                <BannerTitle> {movieData[0].data.results[0].title} </BannerTitle>
                <BannerOverView> {movieData[0].data.results[0].overview} </BannerOverView>
                <BannerGoDetail onClick={() => handleMoveDetail(movieData[0].data.results[0].id)}> 상세 정보 </BannerGoDetail>
            </Banner>
            <Sliders>
                <MoviesSlider
                    movieData={movieData[0].data?.results.slice(1) || []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                    kind="now"
                />
                <MoviesSlider
                    movieData={movieData[1].data?.results || []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                    kind="moviePopular"
                    title="현재 인기가 많은 영화"
                />
                <MoviesSlider
                    movieData={movieData[2].data?.results || []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                    kind="topRated"
                    title="현재까지 가장 인기많은 영화"
                />
                <MoviesSlider
                    movieData={movieData[3].data?.results || []}
                    handleMoveDetail={handleMoveDetail}
                    offset={offset}
                    kind="upcoming"
                    title="곧 개봉할 영화"
                />
            </Sliders>
            {detailMatch && <MovieDetail detailLayout={detailMatch.params.movieId || ""} />}
        </Wrapper>
    );
}

export default HomePage;

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

    h1 {
        position: absolute;
        top: 25%;
        left: 5%;
        font-size: 3rem;
        font-weight: bold;

        @media ${({ theme }) => theme.device.medium} {
            top: 15%;
            font-size: 3.5rem;
        }

        @media ${({ theme }) => theme.device.large} {
            font-size: 4rem;
        }

        @media ${({ theme }) => theme.device.extraLarge} {
            font-size: 5rem;
        }
    }
`;

const BannerTitle = styled.h2`
    font-size: 3.5rem;
    margin-bottom: 20px;

    @media ${({ theme }) => theme.device.large} {
        font-size: 4rem;
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 8rem;
    }
`;

const BannerOverView = styled.p`
    width: 70%;
    font-size: 1.8rem;
    padding-left: 5px;
    line-height: 4rem;

    @media ${({ theme }) => theme.device.extraSmall} {
        font-size: 1.2rem;
        line-height: 3rem;
    }

    @media ${({ theme }) => theme.device.small} {
        font-size: 1.3rem;
    }

    @media ${({ theme }) => theme.device.medium} {
        font-size: 1.5rem;
    }

    @media ${({ theme }) => theme.device.large} {
        font-size: 1.8rem;
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        width: 50%;
        font-size: 2.5rem;
    }
`;

const BannerGoDetail = styled.div`
    width: 200px;
    height: 40px;
    background-color: rgba(127, 127, 127, .7);
    border-radius: 5px;
    margin-top: 50px;
    text-align: center;
    line-height: 40px;
    font-size: 1.8rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: rgba(127, 127, 127, .4);
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        height: 50px;
        line-height: 50px;
        font-size: 2rem;
    }
`;

const Sliders = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 350px;
`;