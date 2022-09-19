import styled from "styled-components";

const LoadingWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
`;

const LoadingTitle = styled.h2`
    font-size: 3rem;
    color: ${({ theme }) => theme.color.white};
`;

function LoadingPage() {
    return (
        <LoadingWrapper>
            <LoadingTitle> Loading... </LoadingTitle>
        </LoadingWrapper>
    );
}

export default LoadingPage;