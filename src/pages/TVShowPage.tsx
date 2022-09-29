import styled from "styled-components";
import { useQueries } from "react-query";
import { getAiringTVShow, getOnAirTVShow, getPopularTVShow, getTopRatedTVShow } from "../network/api";
import LoadingPage from "./LoadingPage";
import { makePath } from "../utiles/makeImagePath";
import { SliderTitle } from "../styles/Slider/wrapper";
import { useMatch, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import TVDetail from "../components/TVDetail/TVDetail";
import TVShowsSlider from "../components/TVSlider/TVShowsSlider";

function TVShowPage() {
    const tvShowsData = useQueries([
        {
            queryKey: ['TVShows', 'onAir'],
            queryFn: () => getOnAirTVShow(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ['TVShows', 'airing'],
            queryFn: () => getAiringTVShow(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ["TVShows", "topRated"],
            queryFn: () => getTopRatedTVShow(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ['TVShows', 'popular'],
            queryFn: () => getPopularTVShow(),
            staleTime: 1800 * 1000,
        }
    ]);

    const isLoading = tvShowsData.some((tvShow) => tvShow.isLoading);

    const navigate = useNavigate();
    const detailTVMatch = useMatch("/tvShows/:tvId");

    const handleMoveDetail = useCallback((tvId: string) => {
        navigate(`/tvShows/${tvId}`);
    }, [navigate]);


    if (isLoading) return <LoadingPage />

    return (
        <Wrapper>
            <Banner bgPhoto={makePath(tvShowsData[0].data.results[0].backdrop_path || "")}>
                <SliderTitle> 지금 방영중인 드라마 </SliderTitle>
                <BannerTitle> {tvShowsData[0].data.results[0].name} </BannerTitle>
                <BannerOverView> {tvShowsData[0].data.results[0].overview} </BannerOverView>
                <BannerGoDetail onClick={() => handleMoveDetail(tvShowsData[0].data.results[0].id)}> 상세 정보 </BannerGoDetail>
            </Banner>
            <Sliders>
                <TVShowsSlider
                    tvsData={tvShowsData[0].data?.results.slice(1) || []}
                    handleMoveDetail={handleMoveDetail}
                    kind="ontheAir"
                />
                <TVShowsSlider
                    tvsData={tvShowsData[1].data?.results || []}
                    handleMoveDetail={handleMoveDetail}
                    kind="airing"
                    title="공개된 드라마"
                />
                <TVShowsSlider
                    tvsData={tvShowsData[2].data?.results || []}
                    handleMoveDetail={handleMoveDetail}
                    kind="tvPopular"
                    title="현재 인기중인 드라마"
                />
                <TVShowsSlider
                    tvsData={tvShowsData[3].data?.results || []}
                    handleMoveDetail={handleMoveDetail}
                    kind="tvTopRated"
                    title="현재까지 가장 인기있는 드라마"
                />
            </Sliders>
            {detailTVMatch && <TVDetail detailLayout={detailTVMatch.params.tvId || ""} />}
        </Wrapper>
    );
}

export default TVShowPage;

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
    background-repeat: no-repeat;
    background-position: center;

    h1 {
        position: absolute;
        top: 20%;
        left: 5%;
        font-size: 3rem;
        font-weight: bold;

        @media ${({ theme }) => theme.device.medium} {
            font-size: 3.5rem;
        }

        @media ${({ theme }) => theme.device.large} {
            font-size: 4rem;
        }

        @media ${({ theme }) => theme.device.extraLarge} {
            font-size: 4.5rem;
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