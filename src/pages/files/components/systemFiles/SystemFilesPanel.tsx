import { DragEvent } from 'react';
import { useBoolean } from 'usehooks-ts';
import { UploadButton } from './Buttons';
import SystemFileRow from './SystemFileRow';
import DropArea from '../DropArea';
import { FilesPanelProps } from '../FilesPanelProps';
import { setError } from '../../filesSlice';
import Panel from '../../../../components/ui/Panel';
import useNotifyOnError from '../../../../hooks/useNotifyOnError';
import { useAddFileMutation } from '../../../../store/apiSlice';
import { useAppDispatch } from '../../../../store/store';

export default ({ files }: FilesPanelProps) => {
  const dispatch = useAppDispatch();
  const {
    value: isDropAreaShown,
    setTrue: showDropArea,
    setFalse: hideDropArea,
  } = useBoolean(false);

  const onError = (err: string) => dispatch(setError(err));

  const [addFile, { isError, error }] = useAddFileMutation();
  useNotifyOnError(onError, isError, error);

  const onDrop = (e: DragEvent) => {
    hideDropArea();
    e.preventDefault();
    Array.from(e.dataTransfer.files)
      .filter(
        ({ type }) => type === 'application/pdf',
      )
      .forEach(
        (file) => addFile(file),
      );
  };

  return (
    <Panel
      header={(
        <>
          <div>Files in the system</div>
          <UploadButton onError={onError} />
        </>
      )}
      onBodyDragEnter={(e) =>
        (
          e.dataTransfer.types.includes('Files')
          && showDropArea()
        )}
      body={(
        <>
          <DropArea
            isShown={isDropAreaShown}
            fileType="Files"
            hide={hideDropArea}
            onDrop={onDrop}
          />
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
