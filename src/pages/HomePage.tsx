import { useQuery } from 'react-query';
import styled from 'styled-components';
import NowSlider from '../components/NowPlaying/NowSlider';
import { getNowPlaying, INowPlaying } from '../network/api';
import { makePath } from '../utiles/makeImagePath';
import LoadingPage from './LoadingPage';

const Wrapper = styled.div`

`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)) ,url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const BannerTitle = styled.h2`
    font-size: 7rem;
    margin-bottom: 20px;
`;

const BannerOverView = styled.p`
    width: 50%;
    font-size: 3rem;
    padding-left: 5px;
    line-height: 4rem;
`;

function HomePage() {
    const { data, isLoading, isFetching } = useQuery<INowPlaying>(["movies", "nowPlaying"], getNowPlaying);

    if (isLoading || isFetching) return <LoadingPage />

    return (
        <Wrapper>
            <Banner bgPhoto={makePath(data?.results[0].backdrop_path || "")}>
                <BannerTitle> {data?.results[0].title} </BannerTitle>
                <BannerOverView> {data?.results[0].overview} </BannerOverView>
            </Banner>
            <NowSlider
                movieData={data ? data?.results.slice(1) : []}
            />
        </Wrapper>
    );
}

export default HomePage;