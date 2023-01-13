import Notification from '../../components/ui/Notification';
import { getErrorMessage, useListFilesQuery } from '../../store/apiSlice';
import DisplayedFilesPanel from './components/displayedFiles/DisplayedFilesPanel';
import StyledPanelView from './components/StyledPanelView';
import SystemFilesPanel from './components/systemFiles/SystemFilesPanel';

export default () => {
  const {
    data: files,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useListFilesQuery();

  return (
    <>
      {isLoading && <Notification>Loading...</Notification>}
      {isSuccess && (
        <StyledPanelView panels={
            [
              <SystemFilesPanel files={files} />,
              <DisplayedFilesPanel files={files} />,
            ]
          }
        />
      )}
      {isError && <Notification type="error">{getErrorMessage(error)}</Notification>}
    </>
  );
};
