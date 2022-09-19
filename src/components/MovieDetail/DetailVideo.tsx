import styled from 'styled-components';
import YouTube from 'react-youtube';
import { IVideo } from '../../type';

interface IVideoProps {
    videoData: IVideo[];
}


function DetailVideo({ videoData }: IVideoProps) {

    return (
        <VideoWrapper>
            <VideoTitle> 현재 게시된 예고편 </VideoTitle>
            {videoData.length === 0 ? <NoneVideo> 현재 존재하는 비디오가 없습니다.</NoneVideo> :
                <Videos>
                    {videoData.map((video) => (
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
                </Videos>
            }
        </VideoWrapper>
    );
}

export default DetailVideo;

const VideoWrapper = styled.div`
    width: 90%;
    height: 10vh;
    padding-top: 30px;
    border-top: 1px solid ${({ theme }) => theme.color.white};;
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

const Videos = styled.div`
    width: 95%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    gap: 20px;

    div {
        width: 100%;
        iframe {
            width: 100% !important;
            height: 300px;
        }
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        display: block;
        
        div {
            width: 50%;
            margin-bottom: 20px;

            iframe {
            }
        }
    }
`;