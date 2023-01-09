import styled from 'styled-components';
import { useToggle } from 'usehooks-ts';
import { clearToken } from '../../../../app/authSlice';
import { setError } from '../../../../app/errorSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/storeHooks';
import Button from '../../../../components/ui/Button';
import handleError from '../../../../data/api/errors';
import { getFile } from '../../../../data/api/files';
import { FileInfo } from '../../../../data/api/types';
import colors from '../../../../data/values/colors';
import FileRow from '../FileRow';

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
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const [isDrawerOpened, toggleIsDrawerOpened] = useToggle(false);

  const openFile = () => (
    getFile(token, file.id).then(
      ({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));

        // Create a temporary link, click it and remove it afterwards
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      },
      (err) => handleError(
        err,
        (message) => dispatch(setError(message)),
        () => dispatch(clearToken()),
      ),
    )
  );

  return (
    <StyledWrapper>
      <StyledFileRow onClick={toggleIsDrawerOpened}>{file.filename}</StyledFileRow>
      {
        isDrawerOpened && (
          <ButtonRow>
            <Button onClick={openFile}>Open</Button>
            <Button>Use</Button>
            <Button color="negative">Delete</Button>
          </ButtonRow>
        )
      }
    </StyledWrapper>
  );
};
