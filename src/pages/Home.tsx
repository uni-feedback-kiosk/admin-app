import styled, { keyframes } from 'styled-components';
import SomeIcon from '../components/SomeIcon';

const BodyGrid = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  align-items: center;
  grid-template:
    "header" 2em
    "main" auto
    "footer" 2em;
`;

const StyledHeader = styled.header`
  text-align: start;
  padding: 0.5em;
`;

const StyledMain = styled.main`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  font-weight: 500;
  font-size: 3em;
`;

const StyledHelloWorld = styled.div`
  padding: 0.5em;
  border-radius: 0.5em;
  background-color: rgba(128, 128, 255, 0.8);
`;

const IconAnimation = keyframes`
  0%, 100% {
    transform: translateX(-100%);
  }
  10% {
    transform: translateX(-100%) rotateY(180deg);
  }
  50% {
    transform: translateX(100%) rotateY(180deg);
  }
  60% {
    transform: translateX(100%) rotateY(0deg);
  }
`;

const StyledIcon = styled(SomeIcon)`
  font-size: 2em;
  animation: ${IconAnimation} 5s linear infinite;
`;

export default () => (
  <BodyGrid>
    <StyledHeader>
      Web application template
    </StyledHeader>
    <StyledMain>
      <StyledHelloWorld>Hello world!</StyledHelloWorld>
      <StyledIcon />
    </StyledMain>
    <footer>
      Source code available at <a href="https://github.com/ntdesmond/react-webpack-ts">GitHub</a>!
    </footer>
  </BodyGrid>
);
