import { useBoolean } from 'usehooks-ts';
import { DragEvent } from 'react';
import LanguageTabs from './LanguageTabs';
import DropArea from '../DropArea';
import { FilesPanelProps } from '../FilesPanelProps';
import { highlightFile, setError, setLanguage } from '../../filesSlice';
import Panel from '../../../../components/ui/Panel';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { KioskFileType } from '../../../../constants';
import { useUpdateFileMutation } from '../../../../store/apiSlice';
import useNotifyOnError from '../../../../hooks/useNotifyOnError';
import { FileInfo } from '../../../../store/models';
import DisplayedFileRow from './DisplayedFileRow';
import RowCollection from '../row/RowCollection';

export default ({ files }: FilesPanelProps) => {
  const language = useAppSelector((store) => store.files.language);
  const dispatch = useAppDispatch();
  const {
    value: isDropAreaShown,
    setTrue: showDropArea,
    setFalse: hideDropArea,
  } = useBoolean(false);

  const onError = (err: string) => dispatch(setError(err));

  const [updateFile, { isError, error }] = useUpdateFileMutation();
  useNotifyOnError(onError, isError, error);

  const onDrop = (e: DragEvent) => {
    hideDropArea();
    try {
      const file: FileInfo = JSON.parse(e.dataTransfer.getData(KioskFileType));
      if (file.description[language] !== '') {
        dispatch(highlightFile(file));
        return;
      }

      updateFile({ id: file.id, description: Object.fromEntries([[language, file.filename]]) });
    } catch {
      onError("Can't recognize the dropped file");
    }
  };

  return (
    <Panel
      header={<LanguageTabs onLanguageChanged={(lang) => dispatch(setLanguage(lang))} />}
      onBodyDragEnter={(e) =>
        (
          e.dataTransfer.types.includes(KioskFileType)
          && showDropArea()
        )}
      body={(
        <>
          <DropArea
            isShown={isDropAreaShown}
            fileType={KioskFileType}
            hide={hideDropArea}
            onDrop={onDrop}
          />
          <RowCollection>
            {files.filter(
              ({ description }) => description[language] !== '',
            ).map(
              (file) => (
                <DisplayedFileRow file={file} key={file.id} />
              ),
            )}
          </RowCollection>
        </>
      )}
    />
  );
};
