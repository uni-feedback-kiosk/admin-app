import { useState } from 'react';
import styled from 'styled-components';
import { Language } from './Language';
import LanguageTabs from './LanguageTabs';
import { FilesPanelProps } from '../FilesPanelProps';
import FileRow from '../FileRow';
import Button from '../../../../components/ui/Button';
import Panel from '../../../../components/ui/Panel';
import Input from '../../../../components/ui/Input';
import { getErrorMessage, useUpdateFileMutation } from '../../../../store/apiSlice';
import Notification from '../../../../components/ui/Notification';
import { FileInfo } from '../../../../store/models';

const StyledFilename = styled.div`
  width: 80%;
  text-align: left;
`;

export default ({ files }: FilesPanelProps) => {
  const [updateFile, { isError, error }] = useUpdateFileMutation();
  const [language, setLanguage] = useState<Language>('ru');

  const removeFile = (file: FileInfo) => {
    updateFile({ id: file.id, description: Object.fromEntries([[language, '']]) });
  };

  return (
    <>
      <Panel
        header={<LanguageTabs onLanguageChanged={setLanguage} />}
        body={(
          <>
            {files.filter(
              ({ description }) => description[language] !== '',
            ).map(
              (file) => (
                <FileRow key={file.id}>
                  <StyledFilename>{file.filename}</StyledFilename>
                  <Input type="text" placeholder="Display name" defaultValue={file.description[language]} />
                  <Button onClick={() => removeFile(file)} color="negative">Remove</Button>
                </FileRow>
              ),
            )}
          </>
      )}
      />
      {isError && <Notification type="error">{getErrorMessage(error!)}</Notification>}
    </>
  );
};
