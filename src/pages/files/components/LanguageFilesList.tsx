import { Spinner, VStack } from '@chakra-ui/react';
import { Language } from '../../../store/models';
import { useListFilesQuery } from '../../../store/apiSlice';
import LanguageFileRow from './LanguageFileRow';

const LanguageFilesList = ({ language }: { language: Language }) => {
  const { data, isLoading } = useListFilesQuery();

  if (isLoading || data === undefined) {
    return <Spinner size="xl" />;
  }

  return (
    <VStack align="stretch">
      {data
        .filter(({ description }) => description[language] !== '')
        .map((file) => (
          <LanguageFileRow key={file.id} file={file} language={language} />
        ))}
    </VStack>
  );
};

export default LanguageFilesList;
