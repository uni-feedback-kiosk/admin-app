import { DragEventHandler } from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants';

interface DropAreaProps {
  isShown: boolean;
  fileType: string;
  hide: () => void;
  onDrop: DragEventHandler
}

const DropArea = styled.div<{ shown: boolean; }>`
  position: absolute;
  inset: 0;
  background-color: #fffa;
  outline: 0.1em dashed ${colors.green};
  outline-offset: -1em;
  color: ${colors.green};
  font-size: 2em;
  display: grid;
  align-content: center;
  justify-content: center;
  z-index: ${({ shown }) => shown ? 5 : -1};
  padding: 1.5em;
  text-align: center;
`;

export default ({ isShown, fileType, hide, onDrop }: DropAreaProps) => (
  <DropArea
    shown={isShown}
    onDragEnter={(e) => e.preventDefault()}
    onDragOver={(e) => (
      e.dataTransfer.types.includes(fileType)
      && e.preventDefault()
    )}
    onDragLeave={hide}
    onDrop={onDrop}
  >
    Drop the file(s) to be added to the list
  </DropArea>
);
