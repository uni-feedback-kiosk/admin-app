import styled from 'styled-components';
import { useToggle } from 'usehooks-ts';
import FileRow from '../FileRow';
import Button from '../../../../components/ui/Button';
import colors from '../../../../constants';
import { getErrorMessage, useLazyGetFileQuery } from '../../../../store/apiSlice';
import Notification from '../../../../components/ui/Notification';
import { FileInfo } from '../../../../store/models';

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
  const [openFile, { isError, error }] = useLazyGetFileQuery();

  const [isDrawerOpened, toggleIsDrawerOpened] = useToggle(false);

  return (
    <StyledWrapper>
      <StyledFileRow onClick={toggleIsDrawerOpened}>{file.filename}</StyledFileRow>
      {
        isDrawerOpened && (
          <ButtonRow>
            <Button onClick={() => openFile(file)}>Open</Button>
            <Button>Use</Button>
            <Button color="negative">Delete</Button>
          </ButtonRow>
        )
      }
      {isError && <Notification type="error">{getErrorMessage(error!)}</Notification>}
    </StyledWrapper>
  );
};
