import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

const StyledLayout = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  align-items: stretch;
  gap: 1em;
  grid-template:
    "header" 6em
    "main" auto;
`;

const StyledMain = styled.main`
  justify-content: space-around;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

export default ({ children }: { children: ReactNode }) => (
  <StyledLayout>
    <Header />
    <StyledMain>{children}</StyledMain>
  </StyledLayout>
);
