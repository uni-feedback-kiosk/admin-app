import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { IoMdEye } from 'react-icons/io';
import { MdFileOpen, MdDelete } from 'react-icons/md';

const Show = () => {
  const rowColor = useColorModeValue('green.main', 'green.600');
  const rowBackgroundColor = useColorModeValue('white', 'darkgray');

  return (
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
                You can also drag the file card into the <b>Shown files</b> panel to <b>Show</b> it.
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
      <Card size="sm" variant="outline" alignSelf="center">
        <CardBody>
          <VStack align="stretch">
            <HStack justify="end">
              <Button size="xs" rightIcon={<BiChevronDown />}>
                Actions
              </Button>
              <Button size="xs">Upload</Button>
            </HStack>
            <Card flex="1">
              <Tooltip label="File card (opened)" hasArrow isOpen>
                <VStack padding="1" align="stretch">
                  <Flex
                    direction="column"
                    align="stretch"
                    bgColor={rowBackgroundColor}
                    borderRadius="md"
                    outline="0.15em solid"
                    outlineColor={rowColor}
                  >
                    <Card padding="1" variant="filled" bgColor={rowColor}>
                      <HStack>
                        <Text width="0" flex="1" noOfLines={1}>
                          WiFi_Manual_EN.pdf
                        </Text>
                        <Tooltip label="Language tag" hasArrow placement="right">
                          <Badge>EN</Badge>
                        </Tooltip>
                      </HStack>
                    </Card>
                    <HStack padding="2" justifyContent="space-evenly">
                      <Tooltip label="Open (download) file" hasArrow placement="top">
                        <Button size="xs" leftIcon={<MdFileOpen />}>
                          Open
                        </Button>
                      </Tooltip>
                      <Tooltip
                        label="Show/Hide toggle for current language"
                        hasArrow
                        placement="top"
                      >
                        <Button size="xs" leftIcon={<IoMdEye />}>
                          Hide (en)
                        </Button>
                      </Tooltip>
                      <Tooltip label="Delete file" hasArrow placement="top">
                        <Button size="xs" leftIcon={<MdDelete />} colorScheme="red">
                          Delete
                        </Button>
                      </Tooltip>
                    </HStack>
                  </Flex>
                </VStack>
              </Tooltip>
            </Card>
          </VStack>
        </CardBody>
        <CardFooter>
          <Text width="0" flex="1" align="center" marginTop={4}>
            Hover on the elements to see their description.
          </Text>
        </CardFooter>
      </Card>
    </VStack>
  );
};

export default Show;
