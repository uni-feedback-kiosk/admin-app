import {
  Card,
  CardBody,
  useDisclosure,
  Collapse,
  Flex,
  HStack,
  Button,
  Icon,
} from '@chakra-ui/react';
import { MdDelete, MdFileOpen } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import { useCallback } from 'react';
import { FileInfo, Language } from '../../../store/models';
import {
  useDeleteFileMutation,
  useLazyGetFileQuery,
  useUpdateFileMutation,
} from '../../../store/apiSlice';

const SystemFileRow = ({ file, language }: { file: FileInfo; language: Language }) => {
  const { isOpen: isButtonRowShown, onToggle: onToggleButtons } = useDisclosure();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const [openFile, { isLoading: isOpening }] = useLazyGetFileQuery();
  const [updateFile, { isLoading: isUpdating }] = useUpdateFileMutation();

  const onDelete = useCallback(async () => {
    await deleteFile(file.id);
  }, [deleteFile, file]);

  const onOpen = useCallback(async () => {
    await openFile(file);
  }, [openFile, file]);

  const onAdd = useCallback(async () => {
    await updateFile({
      id: file.id,
      description: Object.fromEntries([[language, file.filename]]) as Record<Language, string>,
    });
  }, [updateFile, file, language]);

  return (
    <Flex
      direction="column"
      align="stretch"
      bgColor="white"
      borderRadius="md"
      outline="0.15em solid"
      outlineColor="green.500"
    >
      <Card
        cursor="pointer"
        variant="filled"
        size="sm"
        bgColor="green.main"
        color="white"
        userSelect="none"
        onClick={onToggleButtons}
      >
        <CardBody>{file.filename}</CardBody>
      </Card>
      <Collapse in={isButtonRowShown}>
        <HStack padding="2">
          <Button
            leftIcon={<Icon boxSize={6} as={MdFileOpen} />}
            onClick={onOpen}
            isLoading={isOpening}
          >
            Open
          </Button>
          <Button
            leftIcon={<Icon boxSize={6} as={FiArrowRight} />}
            isDisabled={file.description[language] !== ''}
            onClick={onAdd}
            isLoading={isUpdating}
          >
            Add
          </Button>
          <Button
            leftIcon={<Icon boxSize={6} as={MdDelete} />}
            colorScheme="red"
            isLoading={isDeleting}
            onClick={onDelete}
          >
            Delete
          </Button>
        </HStack>
      </Collapse>
    </Flex>
  );
};

export default SystemFileRow;
