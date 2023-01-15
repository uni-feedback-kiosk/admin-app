import { DragEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants';

export interface PanelProps {
  header: ReactNode
  body: ReactNode
  onBodyDragEnter?: DragEventHandler
}

const StyledPanel = styled.section`
  display: grid;
  grid-template:
    "header" 2em
    "main" auto;
  gap: 1em;
  min-height: 0;
  box-sizing: border-box;
`;

const PanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: space-between;
`;

const PanelBody = styled.div`
  position: relative;
  background: ${colors.light_grey};
  border-radius: 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  justify-content: start;
  align-items: stretch;
  overflow-y: scroll;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
`;

export default ({ header, body, onBodyDragEnter }: PanelProps) => (
  <StyledPanel>
    <PanelHeader>{header}</PanelHeader>
    <PanelBody onDragEnter={onBodyDragEnter}>{body}</PanelBody>
  </StyledPanel>
);
