import styled from 'styled-components';
import { useBoolean } from 'usehooks-ts';
import { DragEvent } from 'react';
import { RemoveButton } from './Buttons';
import DisplayNameInput from './DisplayNameInput';
import LanguageTabs from './LanguageTabs';
import { FilesPanelProps } from '../FilesPanelProps';
import FileRow from '../FileRow';
import Panel from '../../../../components/ui/Panel';
import { setError, setLanguage } from '../../filesSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { colors, DraggedFileType } from '../../../../constants';
import { useUpdateFileMutation } from '../../../../store/apiSlice';
import useNotifyOnError from '../../../../hooks/useNotifyOnError';
import { FileInfo } from '../../../../store/models';

const StyledFilename = styled.div`
  flex: 2;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const DropArea = styled.div<{ shown: boolean; }>`
  position: absolute;
  inset: 0;
  background-color: #fffa;
  outline: 0.1em dashed ${colors.green};
  outline-offset: -1em;
  color: ${colors.green};
  font-size: 2em;
  display: grid;
  align-content: center;
  justify-content: center;
  z-index: ${({ shown }) => shown ? 1 : -1};
`;

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
      const file: FileInfo = JSON.parse(e.dataTransfer.getData(DraggedFileType));
      updateFile({ id: file.id, description: Object.fromEntries([[language, file.filename]]) });
    } catch {
      onError("Can't recognize the dropped file");
    }
  };

  return (
    <Panel
      header={<LanguageTabs onLanguageChanged={(lang) => dispatch(setLanguage(lang))} />}
      onBodyDragEnter={showDropArea}
      body={(
        <>
          <DropArea
            shown={isDropAreaShown}
            onDragEnter={(e) => e.preventDefault()}
            onDragOver={(e) => (
              e.dataTransfer.types.includes(DraggedFileType)
              && e.preventDefault()
            )}
            onDragLeave={hideDropArea}
            onDrop={onDrop}
          >
            Drop the file to add it to the list
          </DropArea>
          {files.filter(
            ({ description }) => description[language] !== '',
          ).map(
            (file) => (
              <FileRow key={file.id}>
                <StyledFilename>{file.filename}</StyledFilename>
                <DisplayNameInput file={file} />
                <RemoveButton file={file} onError={onError} />
              </FileRow>
            ),
          )}
        </>
      )}
    />
  );
};
