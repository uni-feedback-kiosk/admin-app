import Panel from '../../../../components/ui/Panel';
import { useAppDispatch } from '../../../../store/store';
import { setError } from '../../filesSlice';
import { FilesPanelProps } from '../FilesPanelProps';
import { UploadButton } from './Buttons';
import SystemFileRow from './SystemFileRow';

export default ({ files }: FilesPanelProps) => {
  const dispatch = useAppDispatch();

  return (
    <Panel
      header={(
        <>
          <div>Files in the system</div>
          <UploadButton onError={(error) => dispatch(setError(error))} />
        </>
    )}
      body={(
        <>
          {files.map(
            (file) => (
              <SystemFileRow key={file.id} file={file} />
            ),
          )}
        </>
    )}
    />
  );
};
