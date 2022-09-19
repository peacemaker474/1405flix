import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";

function NavLists() {
    const homeMatch = useMatch("/");
    const tvShowMatch = useMatch("/tvShows");

    return (
        <MainLists>
            <MainList current={!homeMatch}>
                <MainLink to="/">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                    </span>
                    <LinkText> 홈 </LinkText>
                </MainLink>
            </MainList>
            <MainList current={!tvShowMatch}>
                <MainLink to="/tvShows">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                        </svg>
                    </span>
                    <LinkText> TV 시리즈 </LinkText>
                </MainLink>
            </MainList>
        </MainLists>
    );
}

export default NavLists;

const MainLists = styled.ul`
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const MainList = styled.li<{ current: boolean }>`
    cursor: pointer;
    padding: 16px 18px;
    font-weight: ${({ current }) => !current ? "bold" : "none"};
`;

const MainLink = styled(Link)`
    color: ${({ theme }) => theme.color.white};
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 50px;

    span {
        display: flex;
        align-items: center;
        padding-right: 10px;
        svg {
            width: 20px;
            height: 20px;
            fill: ${({ theme }) => theme.color.white};
        }
    }
`;

const LinkText = styled.p`
    display: inline-block;
    white-space: nowrap;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.color.white};
        height: 2px;

        width: 0;
        bottom: -50%;
        transition: 0.7s;
        right: 0px;
    }

    &:hover::before {
        width: 100%;
    }
`;