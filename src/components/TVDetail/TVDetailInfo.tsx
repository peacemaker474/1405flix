import styled from "styled-components";
import { ITVDetailInfo } from "../../network/api";
import { makePath } from "../../utiles/makeImagePath";

interface ITVDetailProps {
    infoData: ITVDetailInfo;
}

function TVDetailInfo({ infoData }: ITVDetailProps) {
    return (
        <>
            <DetailCover bgPhoto={makePath(infoData.backdrop_path ? infoData.backdrop_path : infoData.poster_path, "w500")} />
            <MovieTitle> {infoData.name} </MovieTitle>
            <MovieContent>
                <MovieOverview> {infoData.overview} </MovieOverview>
                <MovieETCInfo>
                    <MovieGenresBox>
                        <span> 장르: </span>
                        {infoData.genres.slice(0, 3).map((genre) => (
                            <span key={genre.id}> {genre.name} </span>
                        ))}
                    </MovieGenresBox>
                </MovieETCInfo>
            </MovieContent>
        </>
    );
}

export default TVDetailInfo;

const DetailCover = styled.div<{ bgPhoto: string }>`
    width: 100%;
    height: 600px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${props => props.bgPhoto});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const MovieTitle = styled.h2`
    font-size: 3rem;
    color: white;
    position: relative;
    top: -100px;
    padding-left: 30px;
    letter-spacing: 2px;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 4rem;
    }
`;

const MovieContent = styled.div`
    width: 100%;
    display: flex;
`;

const MovieOverview = styled.p`
    width: 70%;
    font-size: 1.5rem;
    padding-left: 30px;
    line-height: 3rem;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 1.7rem;
    }
`;

const MovieETCInfo = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    gap: 30px;
`;

const MovieRunningTime = styled.p`
    padding-left: 2px;
    font-size: 1.3rem;
    word-break: keep-all;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 1.5rem;
    }
`;

const MovieGenresBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
        font-size: 1.2rem;
        padding: 0 3px;
        display: block;
    }

    span:first-child {
        font-size: 1.5rem;
        font-weight: bold;
        padding-right: 5px;
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        display: block;

        span {
            display:inline;
            font-size: 1.5rem;
        }

        span:first-child {
            font-size: 1.8rem;
        }
    }
`;