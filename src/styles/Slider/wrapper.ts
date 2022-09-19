import styled from "styled-components";
import { motion } from 'framer-motion';

export const SliderWrapper = styled.div`
    position: relative;
    top: -100px;

    h1 {
        position: absolute;
        top: -50px;
        left: -50px;
    }
`;

export const SliderTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    padding: 0 0 50px 70px;

    @media ${({ theme }) => theme.device.extraLarge} {
        font-size: 3rem;
    }
`;

export const LeftButton = styled.button`
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

export const RightButton = styled(LeftButton)`
    right: 0 !important;
    z-index: 5;
`;

export const SliderLists = styled(motion.div)`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    position: absolute;
`;

export const SliderList = styled(motion.div)`
    background-color: white;
    height: 200px;
    color: black;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: rgb(17, 18, 29);
    cursor: pointer;
    
    &:first-child {
        transform-origin: center left !important;
    }
    &:last-child {
        transform-origin: center right !important;
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: fill;
    }
`;

export const InfoBox = styled(motion.div)`
    width: 90%;
    height: 100px;
    background-color: rgb(17, 18, 29);
    display: none;
    margin: 0 auto;
    justify-content: space-between;
    padding-top: 20px;
`;

export const InfoTitle = styled.h4`
    width: 80%;
    font-size: 1.2rem;
    color: rgb(247, 247, 247);
    line-height: 1.5rem;

    @media ${({ theme }) => theme.device.extraLarge} {
        padding-top: 10px;
        font-size: 1.8rem;
        line-height: 0;
    }
`;

export const ToggleBtn = styled.div`
    width: 20px;
    height: 20px;
    border: 1px solid rgb(247, 247, 247);
    border-radius: 50%;
    display: flex;
    align-items: center;
    background-color: rgba(127, 127, 127, .3);

    &:hover {
        border-width: 2px;
    }

    svg {
        width: 100%;
        height: 80%;
        fill: rgb(247, 247, 247);
    }

    @media ${({ theme }) => theme.device.large} {
    }

    @media ${({ theme }) => theme.device.extraLarge} {
        width: 25px;
        height: 25px;
        font-size: 2.5rem;
    }
`;