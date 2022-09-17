import { useState } from 'react';
import styled from "styled-components";
import { motion, AnimatePresence } from 'framer-motion';
import { IMovie } from '../../network/api';
import { makePath } from '../../utiles/makeImagePath';

const nowVariants = {
    hidden: (isBack: boolean) => ({
        x: isBack ? -window.outerWidth : window.outerWidth,
    }),
    visible: {
        x: 0,
    },
    exit: (isBack: boolean) => ({
        x: isBack ? window.outerWidth : -window.outerWidth,
    })
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        height: 300,
        scale: 1.5,
        y: -50,
        boxShadow: "rgba(247, 247, 247, 0.1) 0px 1px 4px, rgb(247, 247, 247) 0px 0px 0px 0px",
        transition: {
            delay: 0.7,
            duration: 0.3,
            type: "tween",
        }
    }
}

const imgVariants = {
    hover: {
        height: 200,
        borderRadius: "5px 5px 0 0",
        transition: {
            delay: 0.7,
            duration: 0.3,
        }
    }
}

const infoVariants = {
    hover: {
        opacity: 1,
        borderRadius: "0 0 5px 5px",
        transition: {
            delay: 0.7,
            duration: 0.3,
        }
    }
}

function NowSlider({ movieData }: { movieData: IMovie[] }) {
    const [index, setIndex] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const offset = 6;
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
    }

    return (
        <SliderWrapper>
            <LeftButton onClick={handleDecreaseIndex}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </LeftButton>
            <AnimatePresence initial={false} onExitComplete={handleCheckLeaving}>
                <NowLists
                    custom={isBack}
                    variants={nowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                        type: "tween",
                        duration: 2,
                    }}
                    key={index}
                >
                    {
                        movieData?.slice(index * offset, offset * index + offset).map(movie => (
                            <NowList
                                key={movie.id}
                                variants={boxVariants}
                                initial="normal"
                                whileHover="hover"
                                transition={{
                                    type: "tween"
                                }}
                            >
                                <motion.img variants={imgVariants} src={makePath(movie.backdrop_path ? movie.backdrop_path : movie.poster_path, "w500")} />
                                <NowInfo variants={infoVariants}>
                                    <h4>  {movie.title}  </h4>
                                </NowInfo>
                            </NowList>
                        ))
                    }
                </NowLists>
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

const SliderWrapper = styled.div`
    position: relative;
    top: -100px;
`;

const LeftButton = styled.button`
    all: unset;
    width: 50px;
    height: 200px;
    background-color: rgba(7, 7, 7, .4);
    position: absolute;
    top: 0;
    z-index: 5;
    cursor: pointer;

    &:hover {
        background-color: rgba(7, 7, 7, .7);
    }
    
    svg {
        fill: rgb(247, 247, 247);
        width: 100%;
        height: 20%;
    }
`;

const RightButton = styled(LeftButton)`
    right: 0 !important;
    z-index: 5;
`;

const NowLists = styled(motion.div)`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    position: absolute;
`;

const NowList = styled(motion.div)`
    background-color: white;
    height: 200px;
    color: black;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: rgb(17, 18, 29);
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
`;

const NowInfo = styled(motion.div)`
    width: 100%;
    height: 100px;
    background-color: rgb(17, 18, 29);
    opacity: 0;

    h4 {
        font-size: 1.8rem;
        color: rgb(247, 247, 247);
        padding: 20px 0 0 20px;
    }
`;