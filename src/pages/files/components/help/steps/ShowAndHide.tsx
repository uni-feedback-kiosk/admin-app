import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Fade,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdFileOpen, MdDelete } from 'react-icons/md';
import { DragEventHandler, useCallback } from 'react';
import DropArea from '../../DropArea';
import useFileDrag from '../../../hooks/useFileDrag';
import KioskFileType from '../../../KioskFileType';

const onFileDragStart: DragEventHandler = (event) => {
  event.dataTransfer.setData(KioskFileType, '');
};

const ShowAndHide = () => {
  const rowColor = useColorModeValue('green.main', 'green.600');
  const rowBackgroundColor = useColorModeValue('white', 'darkgray');
  const inputTextColor = useColorModeValue('darkgray', 'white');
  const inputBackgroundColor = useColorModeValue('white', 'darkgray');

  const [isDropAreaShown, { hide: hideDropArea, show: showDropArea }] = useFileDrag({
    fileTypeFilter: KioskFileType,
  });

  const {
    isOpen: isFileShown,
    onOpen: showFile,
    onToggle: toggleFile,
    onClose: hideFile,
  } = useDisclosure();

  const onFileDropped = useCallback(() => {
    hideDropArea();
    showFile();
  }, [hideDropArea, showFile]);

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
                <br />
                File rows in <b>Shown files</b> also have <b>Hide</b> button for easier access.
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
      <Card size="sm" variant="outline" alignSelf="center" minWidth="2xl">
        <CardBody>
          <HStack align="stretch" minHeight="36">
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
                    <Card padding="1" variant="filled" bgColor={rowColor} color="white">
                      <HStack>
                        <Text width="0" flex="1" noOfLines={1}>
                          WiFi_Manual_EN.pdf
                        </Text>
                        <Tooltip label="Language tag" hasArrow placement="right">
                          <Badge>EN</Badge>
                        </Tooltip>
                      </HStack>
                    </Card>
                    <Flex
                      direction="column"
                      align="stretch"
                      bgColor={rowBackgroundColor}
                      borderRadius="md"
                      outline="0.15em solid"
                      outlineColor={rowColor}
                    >
                      <Card
                        padding="1"
                        variant="filled"
                        bgColor={rowColor}
                        color="white"
                        draggable
                        onDragStart={onFileDragStart}
                        userSelect="none"
                        cursor="pointer"
                        border="none"
                      >
                        <HStack>
                          <Text width="0" flex="1" noOfLines={1}>
                            WiFi_Manual_RU.pdf
                          </Text>
                          <Box
                            as={Fade}
                            in={isFileShown}
                            visibility={isFileShown ? 'visible' : 'hidden'}
                          >
                            <Tooltip label="Language tag" hasArrow placement="right">
                              <Badge>RU</Badge>
                            </Tooltip>
                          </Box>
                        </HStack>
                      </Card>
                      <HStack padding="2" justifyContent="space-evenly" minWidth="18em">
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
                          <Button
                            size="xs"
                            leftIcon={isFileShown ? <IoMdEye /> : <IoMdEyeOff />}
                            variant={isFileShown ? 'solid' : 'outline'}
                            onClick={toggleFile}
                          >
                            {isFileShown ? 'Hide' : 'Show'} (ru)
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
            <VStack align="stretch" flex="3">
              <HStack>
                <Button variant="outline" flex="1" size="xs">
                  English
                </Button>
                <Tooltip label="Russian language tab is opened" hasArrow placement="top">
                  <Button flex="1" size="xs">
                    Russian
                  </Button>
                </Tooltip>
              </HStack>
              <Tooltip label="Shown files panel" hasArrow isOpen placement="bottom">
                <Card flex="1" onDragEnter={showDropArea}>
                  <DropArea
                    fileType={KioskFileType}
                    isShown={isDropAreaShown}
                    onDragLeave={hideDropArea}
                    onDrop={onFileDropped}
                    fontSize="md"
                  >
                    Drop file here to show it
                  </DropArea>
                  <VStack padding="1" align="stretch">
                    <Box as={Fade} in={isFileShown} visibility={isFileShown ? 'visible' : 'hidden'}>
                      <Card padding="1" variant="filled" bgColor={rowColor} color="white">
                        <HStack>
                          <Text width="0" flex="1" noOfLines={1}>
                            WiFi_Manual_RU.pdf
                          </Text>
                          <InputGroup size="sm" width="0" minWidth="12em" flex="1">
                            <Input
                              value="WiFi_Manual_RU.pdf"
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
                          <Button
                            colorScheme="red"
                            size="xs"
                            leftIcon={<IoMdEyeOff />}
                            onClick={hideFile}
                          >
                            Hide
                          </Button>
                        </HStack>
                      </Card>
                    </Box>
                  </VStack>
                </Card>
              </Tooltip>
            </VStack>
          </HStack>
        </CardBody>
        <CardFooter>
          <Text width="0" flex="1" align="center" marginTop={4}>
            Hover on the elements to see their description.
            <br />
            Click on <b>Show</b> and <b>Hide</b> buttons to see them in action.
            <br />
            Try <b>dragging</b> the file card into the <b>Shown files</b> panel too.
          </Text>
        </CardFooter>
      </Card>
    </VStack>
  );
};

export default ShowAndHide;
