import { Alert, AlertIcon, Box, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

const Upload = () => (
  <VStack align="stretch">
    <Text>To upload the files, you may do one of the following:</Text>
    <Box>
      <UnorderedList>
        <ListItem>
          Hit the <b>Upload</b> button and select one or more PDF files.
        </ListItem>
        <ListItem>
          Drag and drop one or more files into the <b>System files</b> panel.
        </ListItem>
      </UnorderedList>
    </Box>
    <Alert status="info">
      <AlertIcon />
      Only PDF files are accepted. Other file types will be ignored.
    </Alert>
  </VStack>
);

export default Upload;
