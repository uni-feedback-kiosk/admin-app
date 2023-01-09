import { ReactNode } from 'react';
import styled from 'styled-components';
import colors from '../../data/values/colors';

export interface PanelProps {
  header: ReactNode
  body: ReactNode
}

const StyledPanel = styled.section`
  display: grid;
  grid-template:
    "header" 2em
    "main" auto;
  gap: 1em;
`;

const PanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: space-between;
`;

const PanelBody = styled.div`
  background: ${colors.light_grey};
  border-radius: 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  justify-content: start;
  align-items: stretch;
`;

export default ({ header, body }: PanelProps) => (
  <StyledPanel>
    <PanelHeader>{header}</PanelHeader>
    <PanelBody>{body}</PanelBody>
  </StyledPanel>
);
