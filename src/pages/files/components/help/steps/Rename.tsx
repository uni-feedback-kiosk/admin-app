import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Mark,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoMdEyeOff } from 'react-icons/io';

const Rename = () => {
  const rowColor = useColorModeValue('green.main', 'green.600');
  const inputTextColor = useColorModeValue('darkgray', 'white');
  const inputBackgroundColor = useColorModeValue('white', 'darkgray');

  return (
    <VStack align="stretch">
      <Text>
        After adding the file to a language list, you can rename it freely, so that your document
        has a user-friendly title in the kiosk.
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
      <Card size="sm" variant="outline">
        <CardBody>
          <VStack align="stretch">
            <HStack>
              <Button flex="1" size="xs">
                English
              </Button>
              <Button variant="outline" flex="1" size="xs">
                Russian
              </Button>
            </HStack>
            <Card flex="1">
              <VStack padding="1" align="stretch">
                <Tooltip label="File shown for English language" hasArrow isOpen>
                  <Card padding="1" variant="filled" bgColor={rowColor} color="white">
                    <HStack>
                      <Tooltip label="Uploaded file name" hasArrow placement="top">
                        <Text width="0" flex="1" noOfLines={1}>
                          WiFi_Manual_EN.pdf
                        </Text>
                      </Tooltip>
                      <Tooltip label="User-friendly title" hasArrow placement="top">
                        <InputGroup size="sm" width="0" flex="1">
                          <Input
                            value="Connect Wi-Fi"
                            bgColor={inputBackgroundColor}
                            color={inputTextColor}
                            readOnly
                          />
                          <InputRightElement width="12">
                            <Button size="xs" isDisabled>
                              Save
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </Tooltip>
                      <Tooltip label="Hide button" hasArrow placement="top">
                        <Button leftIcon={<IoMdEyeOff />} colorScheme="red" size="xs">
                          Hide
                        </Button>
                      </Tooltip>
                    </HStack>
                  </Card>
                </Tooltip>
              </VStack>
            </Card>
          </VStack>
        </CardBody>
        <CardFooter>
          <Text width="100%" align="center" marginTop={4}>
            Hover on the elements to see their description.
          </Text>
        </CardFooter>
      </Card>
    </VStack>
  );
};

export default Rename;
