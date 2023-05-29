import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  OrderedList,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';

const Overview = () => {
  const rowColor = useColorModeValue('green.main', 'green.600');
  const inputBackgroundColor = useColorModeValue('white', 'darkgray');
  const inputTextColor = useColorModeValue('darkgray', 'white');

  return (
    <VStack align="stretch">
      <Text>The interface is split into two panels:</Text>
      <Box>
        <OrderedList spacing={2}>
          <ListItem>
            <b>System files</b> panel, where all the uploaded files are displayed. If these files
            are currently shown to the user, files will have <Badge>RU</Badge> or <Badge>EN</Badge>{' '}
            tags accordingly.
          </ListItem>
          <ListItem>
            <b>Shown files</b> panel that displays files currently available to kiosk users. This
            panel has language switching tabs that allow for configuring files shown for each
            language separately.
          </ListItem>
        </OrderedList>
      </Box>
      <Card size="sm" variant="outline">
        <CardBody>
          <HStack align="stretch" minHeight="36">
            <VStack align="stretch" flex="2">
              <HStack justify="end">
                <Tooltip label="Batch actions menu" hasArrow>
                  <Button size="xs" rightIcon={<BiChevronDown />}>
                    Actions
                  </Button>
                </Tooltip>
                <Tooltip label="Upload button" hasArrow>
                  <Button size="xs">Upload</Button>
                </Tooltip>
              </HStack>
              <Tooltip label="System files panel" hasArrow isOpen placement="bottom">
                <Card flex="1">
                  <Tooltip label="Uploaded files" hasArrow placement="right-end">
                    <VStack padding="1" align="stretch">
                      <Card padding="1" variant="filled" bgColor={rowColor} color="white">
                        Connect_to_VPN.pdf
                      </Card>
                      <Card padding="1" variant="filled" bgColor={rowColor} color="white">
                        <HStack>
                          <Text width="0" flex="1" noOfLines={1}>
                            WiFi_Manual_EN.pdf
                          </Text>
                          <Badge>EN</Badge>
                        </HStack>
                      </Card>
                    </VStack>
                  </Tooltip>
                </Card>
              </Tooltip>
            </VStack>
            <VStack align="stretch" flex="3">
              <Tooltip label="Language switching tabs" hasArrow>
                <HStack>
                  <Button flex="1" size="xs">
                    English
                  </Button>
                  <Button variant="outline" flex="1" size="xs">
                    Russian
                  </Button>
                </HStack>
              </Tooltip>
              <Tooltip label="Shown files panel" hasArrow isOpen placement="bottom">
                <Card flex="1">
                  <Tooltip label="Files shown for English language" hasArrow>
                    <VStack padding="1" align="stretch">
                      <Card padding="1" variant="filled" bgColor={rowColor} color="white">
                        <HStack>
                          <Text width="0" flex="1" noOfLines={1}>
                            WiFi_Manual_EN.pdf
                          </Text>
                          <InputGroup size="sm" width="0" minWidth="10em" flex="1">
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
                          <Button colorScheme="red" size="xs">
                            Hide
                          </Button>
                        </HStack>
                      </Card>
                    </VStack>
                  </Tooltip>
                </Card>
              </Tooltip>
            </VStack>
          </HStack>
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

export default Overview;
