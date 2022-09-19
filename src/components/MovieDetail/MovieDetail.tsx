import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import { useQueries } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailMovie, getMovieVideos } from '../../network/api';
import LoadingPage from '../../pages/LoadingPage';
import { CancelBtn } from '../../styles/Common/Button';
import DetailInfo from './DetailInfo';
import DetailVideo from './DetailVideo';

const MovieDetailWrapper = styled(motion.div)`
    width: 60vw;
    height: 100vh;
    position: fixed;
    top: 3%;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: rgba(17, 18, 28, .9);
    z-index: 100;
    border-radius: 5px;

    overflow-x:hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        width: 50vw;
    }
`;

const DetailOverlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(17, 18, 28, .6);
    opacity: 0;
`;

interface IDetailProps {
    detailLayout: string;
}


function MovieDetail({ detailLayout }: IDetailProps) {
    const detailData = useQueries([
        {
            queryKey: ['movieDetail', 'Information'],
            queryFn: () => getDetailMovie(detailLayout + ""),
        },
        {
            queryKey: ['movieDetail', 'Videos'],
            queryFn: () => getMovieVideos(detailLayout + ""),
        }
    ]);

    const isLoading = detailData?.some((data) => data.isLoading);

    const navigate = useNavigate();
    const handleHomeClick = useCallback(() => {
        navigate(-1)
    }, [navigate]);

    return (
        <AnimatePresence>
            <MovieDetailWrapper key={detailLayout} layoutId={detailLayout}>
                <CancelBtn onClick={handleHomeClick}> ✖ </CancelBtn>
                {isLoading ? <LoadingPage /> :
                    detailData &&
                    <>
                        <DetailInfo infoData={detailData[0].data!} />
                        <DetailVideo videoData={detailData[1].data.results!} />
                    </>
                }
            </MovieDetailWrapper>
            <DetailOverlay onClick={handleHomeClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        </AnimatePresence>
    );
}

export default MovieDetail;