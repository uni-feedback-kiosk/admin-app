import { Alert, AlertIcon, Box, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

const Show = () => (
  <VStack align="stretch">
    <Text>
      After uploading the files, you will find them in the <b>System files</b> panel.
    </Text>
    <Text>By clicking on a file card, a drawer menu opens, where you can:</Text>
    <Box>
      <UnorderedList spacing={2}>
        <ListItem>
          <b>Open</b> the file (download it to your computer).
        </ListItem>
        <ListItem>
          <Text>
            <b>Show</b> or <b>Hide</b> the file in the list for the currently selected language.
          </Text>

          <Alert variant="left-accent" status="info" paddingY={1}>
            <Text>
              You can also drag the file into the <b>Shown files</b> panel to <b>Show</b> it.
            </Text>
          </Alert>
        </ListItem>
        <ListItem>
          <b>Delete</b> the file from the kiosk completely.
        </ListItem>
      </UnorderedList>
    </Box>
    <Alert status="info">
      <AlertIcon />
      Uploaded files are not immediately shown to the kiosk users. They have to be added to the
      appropriate list first.
    </Alert>
  </VStack>
);

export default Show;
