import styled from 'styled-components';
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
`;

const StyledFileRow = styled(FileRow)`
  cursor: pointer;
  user-select: none;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5em;
  margin: 0.5em;
`;

export default ({ file }: { file: FileInfo }) => {
  const [isDrawerOpened, toggleIsDrawerOpened] = useToggle(false);
  const dispatch = useAppDispatch();

  const onError = (error: string) => dispatch(setError(error));

  return (
    <StyledWrapper>
      <StyledFileRow onClick={toggleIsDrawerOpened}>{file.filename}</StyledFileRow>
      {
        isDrawerOpened && (
          <ButtonRow>
            <DownloadButton file={file} onError={onError} />
            <AddToListButton file={file} onError={onError} />
            <DeleteButton file={file} onError={onError} />
          </ButtonRow>
        )
      }
    </StyledWrapper>
  );
};
