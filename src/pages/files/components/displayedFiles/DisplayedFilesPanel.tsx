import styled from 'styled-components';
import { RemoveButton } from './Buttons';
import DisplayNameInput from './DisplayNameInput';
import LanguageTabs from './LanguageTabs';
import { FilesPanelProps } from '../FilesPanelProps';
import FileRow from '../FileRow';
import Panel from '../../../../components/ui/Panel';
import { setError, setLanguage } from '../../filesSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const StyledFilename = styled.div`
  flex: 2;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export default ({ files }: FilesPanelProps) => {
  const language = useAppSelector((store) => store.files.language);
  const dispatch = useAppDispatch();

  return (
    <Panel
      header={<LanguageTabs onLanguageChanged={(lang) => dispatch(setLanguage(lang))} />}
      body={(
        <>
          {files.filter(
            ({ description }) => description[language] !== '',
          ).map(
            (file) => (
              <FileRow key={file.id}>
                <StyledFilename>{file.filename}</StyledFilename>
                <DisplayNameInput file={file} />
                <RemoveButton file={file} onError={(error) => dispatch(setError(error))} />
              </FileRow>
            ),
          )}
        </>
      )}
    />
  );
};
