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
            <TVTitle> {infoData.name} </TVTitle>
            <TVContent>
                <TVOverview> {infoData.overview ? infoData.overview : "내용이 없습니다."} </TVOverview>
                <TVETCInfo>
                    <TVGerensBox>
                        <span> 장르 : </span>
                        {infoData.genres.slice(0, 3).map((genre) => (
                            <span key={genre.id}> {genre.name} </span>
                        ))}
                    </TVGerensBox>
                    <TVFirstDate>
                        <span> 첫 방영일 : </span>
                        <span> {infoData.first_air_date.replaceAll("-", ".")} </span>
                    </TVFirstDate>
                    <TVRelateLogos>
                        <TVHomPage as="a" target="_blank" href={infoData.homepage}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                        </TVHomPage>
                        {infoData.networks?.map((logo) => (
                            <TVNetwork key={logo.id} bgPhoto={makePath(logo?.logo_path, "w500")} />
                        ))}
                    </TVRelateLogos>
                </TVETCInfo>
            </TVContent>
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

const TVTitle = styled.h2`
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

const TVContent = styled.div`
    width: 100%;
    display: flex;
`;

const TVOverview = styled.p`
    width: 70%;
    font-size: 1.5rem;
    padding-left: 30px;
    line-height: 3rem;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 1.7rem;
    }
`;

const TVETCInfo = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    gap: 30px;
`;

const TVFirstDate = styled.p`
    padding-left: 2px;
    font-size: 1.2rem;
    word-break: keep-all;
    line-height: 2rem;

    span:first-child {
        font-size: 1.5rem;
        font-weight: bold;
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 1.5rem;
        line-height: 0;

        span:first-child {
            font-size: 1.8rem;
        }
    }
`;

const TVRelateLogos = styled.div`
    display: flex;
    gap: 10px;
    padding: 3px;
    align-items: center;
    width: max-content;
    background-color: rgba(247, 247, 247, 1);
    border-radius: 5px;
`;

const TVHomPage = styled.div`
    width: 20px;
    height: 20px;

    @media ${({ theme }) => theme.device.extraLarge} {
        width: 30px;
        height: 30px;
    }
`;

const TVNetwork = styled.div<{ bgPhoto: string }>`
    width: 40px;
    height: 30px;
    background-image: url(${props => props.bgPhoto});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @media ${({ theme }) => theme.device.extraLarge} {
        width: 60px;
        height: 30px;
    }
`;

const TVGerensBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    span {
        font-size: 1.2rem;
        padding: 0 3px;
        display: block;
    }

    span:first-child {
        font-size: 1.5rem;
        font-weight: bold;
        padding-top: 5px;
    }

    @media ${({ theme }) => theme.device.extraLarge} {

        span {
            font-size: 1.5rem;
        }

        span:first-child {
            font-size: 1.8rem;
        }
    }
`;