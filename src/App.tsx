import AppRouter from "./router/AppRouter";

import styled from "styled-components";
import bgImage from './assets/backgroundImage.png';
import Header from "./components/Header/Header";


function App() {
  return (
    <AppWrapper>
      <Header />
      <AppRouter />
      <AppBackground />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 150vh;
`;

const AppBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -3;
  background-image: url(${bgImage});
  background-position-x: 50%;
  background-position-y: center;
  background-size: cover;
  background-repeat-x: no-repeat;
  background-repeat-y: no-repeat;
  background-attachment: fixed;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
`;
