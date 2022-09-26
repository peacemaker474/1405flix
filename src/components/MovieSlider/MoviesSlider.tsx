import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMovie } from '../../type';
import { makePath } from '../../utiles/makeImagePath';
import { boxVariants, imgVariants, infoVariants, sliderVariants } from '../../styles/variants';
import { InfoBox, InfoTitle, LeftButton, RightButton, SliderList, SliderLists, SliderTitle, SliderWrapper, ToggleBtn } from '../../styles/Slider/wrapper';

interface IMovieSliderProps {
    movieData: IMovie[];
    handleMoveDetail: (movieId: string) => void;
    kind: string;
    offset: number;
    title?: string | undefined | null;
}

function MoviesSlider({ movieData, handleMoveDetail, offset, kind, title }: IMovieSliderProps) {
    const [index, setIndex] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [direction, setDirection] = useState(0);
    const maxIndex = Math.floor(movieData?.length / offset) - 1;

    const handleDecreaseIndex = (newDirection: number) => () => {
        if (isLeaving) return;
        setDirection(newDirection);
        handleCheckLeaving();
        setIndex(prev => prev === 0 ? maxIndex : prev - 1);
    };

    const handleIncreaseIndex = (newDirection: number) => () => {
        if (isLeaving) return;
        setDirection(newDirection);
        handleCheckLeaving();
        setIndex(prev => prev === maxIndex ? 0 : prev + 1);
    };

    const handleCheckLeaving = () => setIsLeaving(prev => !prev);

    return (
        <SliderWrapper>
            {title && <SliderTitle> {title} </SliderTitle>}
            <LeftButton onClick={handleDecreaseIndex(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </LeftButton>
            <AnimatePresence initial={false} onExitComplete={handleCheckLeaving} custom={direction}>
                <SliderLists
                    custom={direction}
                    variants={sliderVariants}
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
                                layoutId={movie.id + kind}
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
                                    <ToggleBtn onClick={() => handleMoveDetail(movie.id + kind)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                    </ToggleBtn>
                                </InfoBox>
                            </SliderList>
                        ))
                    }
                </SliderLists>
            </AnimatePresence>
            <RightButton onClick={handleIncreaseIndex(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
            </RightButton>
        </SliderWrapper>
    );
}

export default MoviesSlider;