import {
  Card,
  CardBody,
  useDisclosure,
  Collapse,
  Flex,
  HStack,
  Button,
  Icon,
  useColorModeValue,
  Text,
  Spacer,
  Badge,
} from '@chakra-ui/react';
import { MdDelete, MdFileOpen } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import { useCallback, DragEventHandler, memo } from 'react';
import { FileInfo, Language } from '../../../store/models';
import {
  useDeleteFileMutation,
  useLazyGetFileQuery,
  useUpdateFileMutation,
} from '../../../store/apiSlice';
import { useAppSelector } from '../../../store/store';
import KioskFileType from '../KioskFileType';

interface SystemFileRowProps {
  file: FileInfo;
  dragPreview: HTMLElement | null;
  onDragStarted: (file: FileInfo) => void;
}

const SystemFileRow = memo(({ file, dragPreview, onDragStarted }: SystemFileRowProps) => {
  const rowBackgroundColor = useColorModeValue('white', 'darkgray');
  const rowColor = useColorModeValue('green.main', 'green.600');
  const { isOpen: isButtonRowShown, onToggle: onToggleButtons } = useDisclosure();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const [openFile, { isLoading: isOpening }] = useLazyGetFileQuery();
  const [updateFile, { isLoading: isUpdating }] = useUpdateFileMutation();

  const currentLanguage = useAppSelector((state) => state.files.language);

  const onDelete = useCallback(async () => {
    await deleteFile(file.id);
  }, [deleteFile, file]);

  const onOpen = useCallback(async () => {
    await openFile(file);
  }, [openFile, file]);

  const onAdd = useCallback(async () => {
    await updateFile({
      id: file.id,
      description: Object.fromEntries([[currentLanguage, file.filename]]) as Record<
        Language,
        string
      >,
    });
  }, [updateFile, file, currentLanguage]);

  const onCardDragStart = useCallback<DragEventHandler>(
    (event) => {
      onDragStarted(file);
      event.dataTransfer.setData(KioskFileType, JSON.stringify(file));

      if (!dragPreview) {
        return;
      }
      event.dataTransfer.setDragImage(dragPreview, dragPreview.offsetWidth / 2, 40);
    },
    [dragPreview, file, onDragStarted],
  );

  return (
    <Flex
      direction="column"
      align="stretch"
      bgColor={rowBackgroundColor}
      borderRadius="md"
      outline="0.15em solid"
      outlineColor={rowColor}
    >
      <Card
        position="relative"
        cursor="pointer"
        variant="filled"
        size="sm"
        bgColor={rowColor}
        color="white"
        userSelect="none"
        onClick={onToggleButtons}
        onDragStart={onCardDragStart}
        draggable={dragPreview !== undefined}
      >
        <CardBody>
          <HStack>
            <Text noOfLines={1}>{file.filename}</Text>
            <Spacer />
            {Object.entries(file.description)
              .filter(([_, description]) => description !== '')
              .map(([language]) => (
                <Badge variant="solid" colorScheme="gray">
                  {language}
                </Badge>
              ))}
          </HStack>
        </CardBody>
      </Card>
      {file && (
        <Collapse in={isButtonRowShown}>
          <HStack padding="2" justifyContent="space-evenly">
            <Button
              leftIcon={<Icon boxSize={6} as={MdFileOpen} />}
              onClick={onOpen}
              isLoading={isOpening}
            >
              Open
            </Button>
            <Button
              leftIcon={<Icon boxSize={6} as={FiArrowRight} />}
              isDisabled={file.description[currentLanguage] !== ''}
              onClick={onAdd}
              isLoading={isUpdating}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<Icon boxSize={6} as={MdDelete} />}
              isLoading={isDeleting}
              onClick={onDelete}
            >
              Delete
            </Button>
          </HStack>
        </Collapse>
      )}
    </Flex>
  );
});

export default SystemFileRow;
