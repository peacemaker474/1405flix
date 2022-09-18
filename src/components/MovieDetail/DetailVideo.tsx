import styled from 'styled-components';
import YouTube from 'react-youtube';
import React from 'react';


interface IVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}

interface IVideoProps {
    videoData: IVideo[];
}

const VideoWrapper = styled.div`
    width: 90%;
    height: 10vh;
    padding-top: 30px;
    border-top: 1px solid white;
    margin: 0px auto;
    margin-top: 30px;

    div:last-child {
        padding-bottom: 100px;
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        width: 95%;
    }
`;

const VideoTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 3rem;
    }
`;

const NoneVideo = styled.h2`
    font-size: 2rem;
    text-align: center;
    padding: 20px 0 80px 0;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 2.5rem;
        padding: 20px 0 0 0;
    }
`;


function DetailVideo({ videoData }: IVideoProps) {

    return (
        <VideoWrapper>
            <VideoTitle> 현재 게시된 예고편 </VideoTitle>
            {videoData.length === 0 ? <NoneVideo> 현재 존재하는 비디오가 없습니다.</NoneVideo> :
                videoData.map((video) => (
                    <YouTube
                        key={video.id}
                        style={{
                            marginBottom: 20,
                        }}
                        videoId={video.key}
                        opts={{
                            playerVars: {
                                modestbranding: 1,
                            }
                        }}
                    />
                ))}
        </VideoWrapper>
    );
}

export default DetailVideo;