import styled, { css } from 'styled-components';
import { useToggle } from 'usehooks-ts';
import FileRow from '../FileRow';
import colors from '../../../../constants';
import { FileInfo } from '../../../../store/models';
import { AddToListButton, DeleteButton, DownloadButton } from './Buttons';
import { setError } from '../../filesSlice';
import { useAppDispatch } from '../../../../store/store';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  outline: 0.1em solid ${colors.green};
  border-radius: 0.5em;
  align-items: stretch;
  padding: 0 0.5em;
`;

const StyledFileRow = styled(FileRow)`
  cursor: pointer;
  user-select: none;
  display: block;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: content-box;
  width: 100%;
  margin-left: -0.5em;
  text-align: left;
  font-size: 1em;
  border: none;
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

export default ({ file }: { file: FileInfo }) => {
  const [isDrawerOpened, toggleIsDrawerOpened] = useToggle(false);
  const dispatch = useAppDispatch();

  const onError = (error: string) => dispatch(setError(error));

  return (
    <StyledWrapper>
      <StyledFileRow as="button" onClick={toggleIsDrawerOpened}>
        {file.filename}
      </StyledFileRow>
      <ButtonRow visible={isDrawerOpened}>
        <DownloadButton file={file} onError={onError} />
        <AddToListButton file={file} onError={onError} />
        <DeleteButton file={file} onError={onError} />
      </ButtonRow>
    </StyledWrapper>
  );
};
