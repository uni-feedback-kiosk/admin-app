import styled from 'styled-components';
import LanguageTabs from './LanguageTabs';
import { FilesPanelProps } from '../FilesPanelProps';
import FileRow from '../FileRow';
import Panel from '../../../../components/ui/Panel';
import Input from '../../../../components/ui/Input';
import { setError, setLanguage } from '../../filesSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { RemoveButton } from './Buttons';

const StyledFilename = styled.div`
  flex: 2;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const StyledInput = styled(Input)`
  flex: 1;
  min-width: 15em;
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
                <StyledInput type="text" placeholder="Display name" defaultValue={file.description[language]} />
                <RemoveButton file={file} onError={(error) => dispatch(setError(error))} />
              </FileRow>
            ),
          )}
        </>
      )}
    />
  );
};
