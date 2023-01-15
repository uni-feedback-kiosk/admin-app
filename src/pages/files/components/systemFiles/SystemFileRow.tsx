import { DragEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { useToggle } from 'usehooks-ts';
import { colors, KioskFileType } from '../../../../constants';
import { FileInfo } from '../../../../store/models';
import { AddToListButton, DeleteButton, DownloadButton } from './Buttons';
import { setError } from '../../filesSlice';
import { useAppDispatch } from '../../../../store/store';
import FileRow from '../FileRow';
import useFilteredKeyDown from '../../../../hooks/useFilteredKeyDown';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  outline: 0.1em solid ${colors.green};
  border-radius: 0.5em;
  align-items: stretch;
  padding: 0 0.5em;
  cursor: pointer;
`;

const StyledFilename = styled(FileRow)`
  display: block;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: content-box;
  width: 100%;
  margin-left: -0.5em;
  z-index: 1;
`;

const buttonsVisibility = ({ visible }: { visible: boolean }) => visible ? css`
  margin: 0.5em 0;
  height: 2.2em;
` : css`
  visibility: hidden;
  opacity: 0;
  height: 0;
`;

const ButtonRow = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 0.5em;
  transition: all 0.1s;
  ${buttonsVisibility}
`;

const createDragImage = (filename: string) => {
  const span = document.createElement('span');
  span.innerText = filename;
  span.style.position = 'absolute';
  span.style.top = '-10em';
  document.body.appendChild(span);

  return span;
};

export default ({ file }: { file: FileInfo }) => {
  const [isDrawerOpened, toggleIsDrawerOpened] = useToggle(false);
  const dispatch = useAppDispatch();
  const onKeyDown = useFilteredKeyDown([' ', 'Enter']);

  const onError = (error: string) => dispatch(setError(error));

  const onDragStart: DragEventHandler = (event) => {
    event.dataTransfer.setData(KioskFileType, JSON.stringify(file));

    // The value below can be only changed by assignment
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.effectAllowed = 'link';

    const dragImage = createDragImage(file.filename);
    event.dataTransfer.setDragImage(dragImage, dragImage.offsetWidth / 2, 40);
    document.addEventListener('dragend',
      () => (
        document.body.removeChild(dragImage)
      ),
    );
  };

  return (
    <StyledWrapper>
      <StyledFilename
        draggable="true"
        onDragStart={onDragStart}
        tabIndex={0}
        onKeyDown={onKeyDown(toggleIsDrawerOpened)}
        onClick={toggleIsDrawerOpened}
      >
        {file.filename}
      </StyledFilename>
      <ButtonRow visible={isDrawerOpened}>
        <DownloadButton file={file} onError={onError} />
        <AddToListButton file={file} onError={onError} />
        <DeleteButton file={file} onError={onError} />
      </ButtonRow>
    </StyledWrapper>
  );
};
