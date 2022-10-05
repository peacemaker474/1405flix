import styled from "styled-components";
import { motion } from "framer-motion";

export const SearchContainer = styled.div`
    width: 95%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const SearchTitle = styled.h1`
    font-size: 3rem;
`;

export const SearchSubTitle = styled.span`
    color: rgba(127, 127, 127, .9);
    padding-right: 15px;
`;

export const SearchKeyword = styled.span`
`;

export const SearchLists = styled.ul`
    width: 100%;
    display: flex;
    gap: 50px;
    justify-content: center;
    flex-wrap: wrap;


    @media ${({ theme }) => theme.device.extraLarge} {
        justify-content: flex-start;
    }
`;

export const SearchList = styled(motion.li)`
    width: 350px;
    height: 250px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        height: 250px;
    }
`;

export const SearchInfoBox = styled(motion.div)`
    width: 100%;
    height: 75px;

    display: none;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(17, 18, 28, .7);

    position: relative;

    h3 {
        font-size: 2rem;
        padding-left: 20px;
    }

    div {
        margin-right: 10px;
        cursor: pointer;
    }
`;

export const NoneTitle = styled.h2`
    font-size: 2.5rem;
    padding-left: 10px;
`;