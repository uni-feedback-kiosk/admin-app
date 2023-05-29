import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Circle,
  Code,
  Fade,
  HStack,
  Icon,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { AiFillFileText } from 'react-icons/ai';
import { DragEventHandler, useCallback } from 'react';
import DropArea from '../../DropArea';
import KioskFileType from '../../../KioskFileType';
import useFileDrag from '../../../hooks/useFileDrag';

const onFileDragStart: DragEventHandler = (event) => {
  event.dataTransfer.setData(KioskFileType, '');
};

const Upload = () => {
  const rowColor = useColorModeValue('green.main', 'green.600');
  const { isOpen: isNewFileShown, onOpen: showNewFile, onClose: reset } = useDisclosure();
  const [isDropAreaShown, { hide: hideDropArea, show: showDropArea }] = useFileDrag({
    fileTypeFilter: KioskFileType,
  });

  const onFileDropped = useCallback<DragEventHandler>(() => {
    hideDropArea();
    showNewFile();
  }, [hideDropArea, showNewFile]);

  return (
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
      <Card size="sm" variant="outline">
        <CardBody>
          <Fade in={isNewFileShown}>
            <Button
              size="sm"
              colorScheme="gray"
              position="absolute"
              right="0"
              top="0"
              margin="2"
              onClick={reset}
            >
              Reset
            </Button>
          </Fade>
          <HStack align="stretch" minHeight="36">
            <VStack align="stretch" flex="2">
              <HStack justify="end">
                <Button size="xs" rightIcon={<BiChevronDown />}>
                  Actions
                </Button>
                <Button size="xs">Upload</Button>
              </HStack>
              <Tooltip label="System files panel" hasArrow isOpen placement="bottom">
                <Card flex="1">
                  <DropArea
                    fileType={KioskFileType}
                    isShown={isDropAreaShown}
                    onDragLeave={hideDropArea}
                    onDrop={onFileDropped}
                    fontSize="md"
                  >
                    Drop file here
                  </DropArea>
                  <VStack padding="1" align="stretch" onDragEnter={showDropArea}>
                    <Card padding="1" variant="filled" bgColor={rowColor}>
                      Connect_to_VPN.pdf
                    </Card>
                    <Card padding="1" variant="filled" bgColor={rowColor}>
                      <HStack>
                        <Text width="0" flex="1" noOfLines={1}>
                          WiFi_Manual_EN.pdf
                        </Text>
                        <Badge>EN</Badge>
                      </HStack>
                    </Card>
                    <Box
                      as={Fade}
                      in={isNewFileShown}
                      visibility={isNewFileShown ? 'visible' : 'hidden'}
                    >
                      <Tooltip label="Uploaded file" hasArrow placement="top">
                        <Card padding="1" variant="filled" bgColor={rowColor}>
                          <HStack>
                            <Text width="0" flex="1" noOfLines={1}>
                              WiFi_Manual_RU.pdf
                            </Text>
                          </HStack>
                        </Card>
                      </Tooltip>
                    </Box>
                  </VStack>
                </Card>
              </Tooltip>
            </VStack>
            <Center flex="3">
              <Box borderColor="gray.200" borderWidth="2px" borderRadius="md">
                <HStack justify="end" bgColor="gray.200" padding="1" spacing="1">
                  <Circle filter="drop-shadow(0 0 2px black)" size="4" bgColor="green" />
                  <Circle filter="drop-shadow(0 0 2px black)" size="4" bgColor="yellow" />
                  <Circle filter="drop-shadow(0 0 2px black)" size="4" bgColor="red" />
                </HStack>
                <Card size="sm" draggable onDragStart={onFileDragStart} margin="4">
                  <CardBody>
                    <VStack>
                      <Icon boxSize={10} as={AiFillFileText} />
                      <Text fontSize="xs">WiFi_Manual_RU.pdf</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </Box>
            </Center>
          </HStack>
        </CardBody>
        <CardFooter>
          <Text width="0" flex="1" align="center" marginTop={4}>
            Try dragging <Code>WiFi_Manual_RU.pdf</Code> file into the <b>System files</b> panel
          </Text>
        </CardFooter>
      </Card>
    </VStack>
  );
};

export default Upload;
