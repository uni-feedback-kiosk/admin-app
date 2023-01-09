import Button from '../../../../components/ui/Button';
import Panel from '../../../../components/ui/Panel';
import { FilesPanelProps } from '../FilesPanelProps';
import SystemFileRow from './SystemFileRow';

export default ({ files }: FilesPanelProps) => (
  <Panel
    header={(
      <>
        <div>Files in the system</div>
        <Button>Upload</Button>
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
