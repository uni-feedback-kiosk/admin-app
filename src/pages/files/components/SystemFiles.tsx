import { VStack, Card, CardBody, Text, Spinner } from '@chakra-ui/react';
import { useListFilesQuery } from '../../../store/apiSlice';
import SystemFileRow from './SystemFileRow';

const SystemFiles = () => {
  const { data, isLoading } = useListFilesQuery();

  return (
    <VStack align="stretch" height="100%">
      <Text fontSize="lg">Files in the system</Text>
      <Card variant="filled" flex="1">
        <CardBody>
          {isLoading && <Spinner size="xl" />}
          {data && (
            <VStack align="stretch">
              {data.map((file) => (
                <SystemFileRow key={file.id} file={file} />
              ))}
            </VStack>
          )}
        </CardBody>
      </Card>
    </VStack>
  );
};

export default SystemFiles;
