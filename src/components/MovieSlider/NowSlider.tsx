import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMovie } from '../../network/api';
import { makePath } from '../../utiles/makeImagePath';
import { boxVariants, imgVariants, infoVariants, nowVariants } from '../../styles/variants';
import { InfoBox, InfoTitle, LeftButton, RightButton, SliderList, SliderLists, SliderWrapper, ToggleBtn } from '../../styles/Slider/wrapper';

interface INowProps {
    movieData: IMovie[];
    handleMoveDetail: (movieId: string) => () => void;
    offset: number;
}

function NowSlider({ movieData, handleMoveDetail, offset }: INowProps) {
    const [index, setIndex] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const maxIndex = Math.floor(movieData?.length / offset) - 1;

    const handleCheckLeaving = () => setIsLeaving(prev => !prev);

    const handleIncreaseIndex = () => {
        if (isLeaving) return;
        handleCheckLeaving();
        setIndex(prev => prev === maxIndex ? 0 : prev + 1);
        setIsBack(false);
    };

    const handleDecreaseIndex = () => {
        if (isLeaving) return;
        handleCheckLeaving();
        setIndex(prev => prev === 0 ? maxIndex : prev - 1);
        setIsBack(true);
    };

    return (
        <SliderWrapper>
            <LeftButton onClick={handleDecreaseIndex}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </LeftButton>
            <AnimatePresence initial={false} onExitComplete={handleCheckLeaving}>
                <SliderLists
                    custom={isBack}
                    variants={nowVariants}
                    key={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                        type: "tween",
                        duration: 2,
                    }}
                >
                    {
                        movieData?.slice(index * offset, offset * index + offset).map(movie => (
                            <SliderList
                                key={movie.id}
                                layoutId={movie.id + "now"}
                                variants={boxVariants}
                                initial="normal"
                                whileHover="hover"
                                transition={{
                                    type: "tween"
                                }}
                            >
                                <motion.img variants={imgVariants} src={makePath(movie.backdrop_path ? movie.backdrop_path : movie.poster_path, "w500")} />
                                <InfoBox variants={infoVariants}>
                                    <InfoTitle>  {movie.title}  </InfoTitle>
                                    <ToggleBtn onClick={handleMoveDetail(movie.id + "now")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                    </ToggleBtn>
                                </InfoBox>
                            </SliderList>
                        ))
                    }
                </SliderLists>
            </AnimatePresence>
            <RightButton onClick={handleIncreaseIndex}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
            </RightButton>
        </SliderWrapper>
    );
}

export default NowSlider;