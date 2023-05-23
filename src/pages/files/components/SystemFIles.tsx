import { Center, VStack, Card, CardBody, Text, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useListFilesQuery } from '../../../store/apiSlice';
import SystemFileRow from './SystemFileRow';
import { Language } from '../../../store/models';

const SystemFiles = () => {
  const { data, isLoading } = useListFilesQuery();
  const [language, setLanguage] = useState<Language>('en');

  return (
    <Center flexDirection="row">
      <VStack align="stretch">
        <Text fontSize="lg">Files in the system</Text>
        <Card variant="filled" position="relative">
          <CardBody>
            {isLoading && <Spinner size="xl" />}
            {data && (
              <VStack align="stretch">
                {data.map((file) => (
                  <SystemFileRow key={file.id} {...{ file, language }} />
                ))}
              </VStack>
            )}
          </CardBody>
        </Card>
      </VStack>
    </Center>
  );
};

export default SystemFiles;
