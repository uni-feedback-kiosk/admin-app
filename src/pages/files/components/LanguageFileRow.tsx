import {
  Card,
  CardBody,
  Flex,
  HStack,
  Button,
  Icon,
  Text,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdClose, MdSave } from 'react-icons/md';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { IoMdEyeOff } from 'react-icons/io';
import { FileInfo, Language } from '../../../store/models';
import { useUpdateFileMutation } from '../../../store/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fileDropHandled } from '../../../store/actions';

const LanguageFileRow = memo(({ file, language }: { file: FileInfo; language: Language }) => {
  const isHighlighted = useAppSelector((state) => state.files.droppedFile?.id === file.id);
  const dispatch = useAppDispatch();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inputTextColor = useColorModeValue('darkgray', 'white');
  const unsavedInputBackgroundColor = useColorModeValue('yellow.100', 'yellow.700');
  const inputBackgroundColor = useColorModeValue('white', 'darkgray');
  const rowColor = useColorModeValue('green.main', 'green.600');
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateFile] = useUpdateFileMutation();
  const [canSave, setCanSave] = useState(false);
  const [isNameChanged, setIsNameChanged] = useState(false);

  useEffect(() => {
    if (!isHighlighted) {
      return;
    }
    dispatch(fileDropHandled());
    const element = scope.current;
    element.scrollIntoView({ behavior: 'smooth' });
    animate(
      scope.current,
      {
        filter: [null, 'brightness(1.5) grayscale(0.7)', 'brightness(1) grayscale(0)'],
      },
      { duration: 1 },
    );
  }, [animate, dispatch, isHighlighted, scope]);

  const onNameChange = useCallback(() => {
    const isChanged = inputRef.current?.value !== file.description[language];
    setIsNameChanged(isChanged);
    setCanSave(inputRef.current?.value !== '' && isChanged);
  }, [file, language]);

  const onHide = useCallback(async () => {
    await updateFile({
      id: file.id,
      description: { [language]: '' } as Record<Language, string>,
    });
  }, [file, language, updateFile]);

  const onSave = useCallback(async () => {
    if (!inputRef.current) {
      return;
    }
    await updateFile({
      id: file.id,
      description: { [language]: inputRef.current.value } as Record<Language, string>,
    })
      .unwrap()
      .then(() => {
        setIsNameChanged(false);
        setCanSave(false);
      });
  }, [file.id, language, updateFile]);

  return (
    <Flex
      direction="column"
      align="stretch"
      borderRadius="md"
      outline="0.15em solid"
      outlineColor={rowColor}
    >
      <Card ref={scope} variant="filled" size="sm" bgColor={rowColor} color="white">
        <CardBody>
          <HStack>
            <Text flex="1" noOfLines={1}>
              {file.filename}
            </Text>
            <Input
              ref={inputRef}
              onChange={onNameChange}
              placeholder="Display name"
              bgColor={isNameChanged ? unsavedInputBackgroundColor : inputBackgroundColor}
              color={inputTextColor}
              flex="1"
              defaultValue={file.description[language]}
            />
            <Button
              colorScheme="blue"
              isDisabled={!canSave}
              leftIcon={<Icon boxSize={6} as={MdSave} />}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              leftIcon={<Icon boxSize={6} as={IoMdEyeOff} />}
              onClick={onHide}
              colorScheme="red"
            >
              Hide
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </Flex>
  );
});

export default LanguageFileRow;
