import { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from 'framer-motion';

import Logo from "./Logo";
import NavLists from "./NavLists";
import SearchBtn from "./SearchBtn";

const navVariants = {
    top: {
        backgroundColor: "rgba(17, 19, 28, .0)"
    },
    scroll: {
        backgroundColor: "rgba(17, 19, 28, .6)"
    }
}

function Header() {
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();

    useEffect(() => {
        scrollY.onChange(() => {
            scrollY.get() > 80 ? navAnimation.start("scroll") : navAnimation.start("top")
        })
    }, [scrollY, navAnimation])

    return (
        <MainHeader variants={navVariants} initial="top" animate={navAnimation}>
            <MainNavBar>
                <Logo />
                <NavLists />
                <SearchBtn />
            </MainNavBar>
        </MainHeader>
    );
}

export default Header;

const MainHeader = styled(motion.header)`
    width: 100%;
    height: 72px;
    position: fixed;
    top: 0;
    z-index: 99;
    color: ${({ theme }) => theme.color.white};
`;

const MainNavBar = styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    height: 100%;
    gap: 30px;
`;