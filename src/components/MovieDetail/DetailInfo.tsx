import styled from "styled-components";
import { makePath } from "../../utiles/makeImagePath";

interface IGenres {
    id: number;
    name: string;
}

interface IDetail {
    adult: boolean;
    backdrop_path: string;
    genres: IGenres[];
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    runtime: number;
    tagline: string;
    title: string;
    video: boolean;
}

interface IDetailProp {
    infoData: IDetail;
}

function DetailInfo({ infoData }: IDetailProp) {
    return (
        <>
            <DetailCover bgPhoto={makePath(infoData.backdrop_path ? infoData.backdrop_path : infoData.poster_path, "w500")} />
            <MovieTitle> {infoData.title} </MovieTitle>
            <MovieContent>
                <MovieOverview> {infoData.overview} </MovieOverview>
                <MovieETCInfo>
                    <MovieGenresBox>
                        <span> 장르: </span>
                        {infoData.genres.slice(0, 3).map((genre) => (
                            <span> {genre.name} </span>
                        ))}
                    </MovieGenresBox>
                    <MovieRunningTime> 러닝타임: {infoData.runtime}분 </MovieRunningTime>
                </MovieETCInfo>
            </MovieContent>
        </>
    );
}

export default DetailInfo;

const DetailCover = styled.div<{ bgPhoto: string }>`
    width: 100%;
    height: 600px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${props => props.bgPhoto});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const MovieTitle = styled.h2`
    font-size: 4rem;
    color: white;
    position: relative;
    top: -100px;
    padding-left: 30px;
    letter-spacing: 2px;
`;

const MovieContent = styled.div`
    width: 100%;
    display: flex;
`;

const MovieOverview = styled.p`
    width: 70%;
    font-size: 1.7rem;
    padding-left: 30px;
    line-height: 3rem;
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
    font-size: 1.5rem;
`;

const MovieGenresBox = styled.div`
    width: 100%;

    span {
        font-size: 1.5rem;
        padding: 0 3px;
    }

    span:first-child {
        font-size: 1.8rem;
        font-weight: bold;
        padding-right: 5px;
    }
`;