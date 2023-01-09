import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { clearToken } from '../../app/authSlice';
import { clearError, setError } from '../../app/errorSlice';
import { useAppDispatch, useAppSelector } from '../../app/storeHooks';
import Error from '../../components/ui/Error';
import handleError from '../../data/api/errors';
import { listFiles, updateFile } from '../../data/api/files';
import { FileDescriptionUpdate, FileInfo } from '../../data/api/types';
import DisplayedFilesPanel from './components/displayedFiles/DisplayedFilesPanel';
import StyledPanelView from './components/StyledPanelView';
import SystemFilesPanel from './components/systemFiles/SystemFilesPanel';
import { load, update } from './filesSlice';

export default () => {
  const token = useAppSelector((state) => state.auth.token);
  const files = useAppSelector((state) => state.files.files);
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (token === null) {
        return;
      }

      dispatch(clearError());
      listFiles(token).then(
        (response) => dispatch(load(response.data)),
        (err) => handleError(
          err,
          (message) => dispatch(setError(message)),
          () => dispatch(clearToken()),
        ),
      );
    }, [],
  );

  const updateDescription = (file: FileInfo, description: FileDescriptionUpdate) => {
    if (token === null) {
      return;
    }

    updateFile(token, file.id, { description }).then(
      (response) => dispatch(update(response.data)),
      (err) => handleError(err, setError, () => dispatch(clearToken())),
    );
  };

  if (token === '') {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <StyledPanelView panels={
          [
            <SystemFilesPanel files={files} />,
            <DisplayedFilesPanel files={files} updateDescription={updateDescription} />,
          ]
        }
      />
      {error && <Error>{error}</Error>}
    </>
  );
};
