import { Badge, Box, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';

const Overview = () => (
  <VStack align="stretch">
    <Text>The interface is split into two panels:</Text>
    <Box>
      <OrderedList spacing={2}>
        <ListItem>
          <b>System files</b> panel, where all the uploaded files are displayed. If these files are
          currently shown to the user, files will have <Badge>RU</Badge> or <Badge>EN</Badge> tags
          accordingly.
        </ListItem>
        <ListItem>
          <b>Shown files</b> panel that displays files currently available to kiosk users. This
          panel has language switching tabs that allow for configuring files shown for each language
          separately.
        </ListItem>
      </OrderedList>
    </Box>
  </VStack>
);

export default Overview;
