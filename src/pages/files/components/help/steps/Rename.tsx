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
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoMdEyeOff } from 'react-icons/io';

const Rename = () => {
  const rowColor = useColorModeValue('green.main', 'green.600');
  const inputTextColor = useColorModeValue('darkgray', 'white');
  const inputBackgroundColor = useColorModeValue('white', 'darkgray');
  const unsavedInputBackgroundColor = useColorModeValue('yellow.100', 'yellow.700');
  const [isNameChanged, { on: onNameChanged, off: onNameSaved }] = useBoolean();

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
          color.
          <br />
          Don&#39;t forget to save it.
        </Text>
      </Alert>
      <Card size="sm" variant="outline">
        <CardBody>
          <VStack align="stretch">
            <HStack>
              <Button variant="outline" flex="1" size="xs">
                English
              </Button>
              <Button flex="1" size="xs">
                Russian
              </Button>
            </HStack>
            <Card flex="1">
              <VStack padding="1" align="stretch">
                <Card
                  padding="1"
                  marginBottom="16"
                  variant="filled"
                  bgColor={rowColor}
                  color="white"
                >
                  <HStack>
                    <Tooltip label="Uploaded file name" hasArrow>
                      <Text width="0" flex="1" noOfLines={1}>
                        WiFi_Manual_RU.pdf
                      </Text>
                    </Tooltip>
                    <Tooltip label="User-friendly title" hasArrow>
                      <InputGroup size="sm" width="0" flex="1">
                        <Input
                          defaultValue="WiFi_Manual_RU.pdf"
                          bgColor={
                            isNameChanged ? unsavedInputBackgroundColor : inputBackgroundColor
                          }
                          color={inputTextColor}
                          onChange={onNameChanged}
                        />
                        <InputRightElement width="12">
                          <Button size="xs" isDisabled={!isNameChanged} onClick={onNameSaved}>
                            Save
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </Tooltip>
                    <Tooltip label="Hide button" hasArrow>
                      <Button leftIcon={<IoMdEyeOff />} colorScheme="red" size="xs">
                        Hide
                      </Button>
                    </Tooltip>
                  </HStack>
                </Card>
              </VStack>
            </Card>
          </VStack>
        </CardBody>
        <CardFooter>
          <Text width="100%" align="center">
            Hover on the elements to see their description.
            <br />
            Try changing the file title to &#34;Подключение к Wi-Fi&#34; or anything else.
          </Text>
        </CardFooter>
      </Card>
    </VStack>
  );
};

export default Rename;
