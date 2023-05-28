import { Alert, AlertIcon, Mark, Text, VStack } from '@chakra-ui/react';

const RenameOrHide = () => (
  <VStack align="stretch">
    <Text>
      After adding the file to a language list, you can rename it freely, so that your document has
      a user-friendly title in the kiosk.
    </Text>
    <Alert status="info">
      <AlertIcon />
      <Text>
        Unsaved file name is highlighted with{' '}
        <Mark bgColor="yellow.200" paddingX="1" rounded="sm">
          yellow
        </Mark>{' '}
        color. Don&#39;t forget to save it.
      </Text>
    </Alert>

    <Text>
      File row also has <b>Hide</b> button in case you want to hide the currently displayed file.
    </Text>
  </VStack>
);

export default RenameOrHide;
