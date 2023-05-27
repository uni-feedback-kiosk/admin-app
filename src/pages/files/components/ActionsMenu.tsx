import { useCallback, useRef } from 'react';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
  HStack,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import {
  useDeleteFileMutation,
  useListFilesQuery,
  useUpdateFileMutation,
} from '../../../store/apiSlice';
import { useAppSelector } from '../../../store/store';
import { Language } from '../../../store/models';

const ActionsMenu = () => {
  const { isOpen, onOpen: showConfirmation, onClose } = useDisclosure();
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);
  const { data: files } = useListFilesQuery();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const [updateFile, { isLoading: isUpdating }] = useUpdateFileMutation();
  const language = useAppSelector((state) => state.files.language);

  const onRemoveAll = useCallback(async () => {
    if (!files) {
      return;
    }
    await Promise.all(
      files
        .filter(({ description }) => description[language] !== '')
        .map(({ id }) =>
          updateFile({ id, description: { [language]: '' } as Record<Language, string> }),
        ),
    );
  }, [files, language, updateFile]);

  const onDeleteAll = useCallback(async () => {
    if (!files) {
      return;
    }
    await Promise.all(files.map(({ id }) => deleteFile(id)));
    onClose();
  }, [deleteFile, files, onClose]);

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<Icon boxSize="5" as={BiChevronDown} />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onRemoveAll} closeOnSelect={false}>
            <HStack width="100%">
              <Text>Remove all files ({language})</Text>
              <Spacer />
              {isUpdating && <Spinner />}
            </HStack>
          </MenuItem>
          <MenuItem onClick={showConfirmation}>Delete all files</MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelDeleteRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete all files
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelDeleteRef} onClick={onClose} colorScheme="gray">
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteAll} isLoading={isDeleting} marginLeft={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ActionsMenu;
