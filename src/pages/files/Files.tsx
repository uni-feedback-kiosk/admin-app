import Notification from '../../components/ui/Notification';
import useNotifyOnError from '../../hooks/useNotifyOnError';
import { useListFilesQuery } from '../../store/apiSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import DisplayedFilesPanel from './components/displayedFiles/DisplayedFilesPanel';
import FilesPanelView from './components/FilesPanelView';
import SystemFilesPanel from './components/systemFiles/SystemFilesPanel';
import { setError } from './filesSlice';

export default () => {
  const {
    data: files,
    isLoading,
    isError,
    isSuccess,
    error: listFilesError,
  } = useListFilesQuery();

  const error = useAppSelector((store) => store.files.error);
  const dispatch = useAppDispatch();

  useNotifyOnError(
    (err) => dispatch(setError(err)),
    isError,
    listFilesError,
  );

  return (
    <>
      {isLoading && <Notification>Loading...</Notification>}
      {isSuccess && (
        <FilesPanelView
          left={<SystemFilesPanel files={files} />}
          right={<DisplayedFilesPanel files={files} />}
        />
      )}
      {error && <Notification type="error">{error}</Notification>}
    </>
  );
};
