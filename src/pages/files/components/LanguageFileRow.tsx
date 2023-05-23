import { Card, CardBody, Flex, HStack, Button, Icon, Text, Input } from '@chakra-ui/react';
import { MdClose, MdSave } from 'react-icons/md';
import { useCallback, useRef, useState } from 'react';
import { FileInfo, Language } from '../../../store/models';
import { useUpdateFileMutation } from '../../../store/apiSlice';

const LanguageFileRow = ({ file, language }: { file: FileInfo; language: Language }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateFile] = useUpdateFileMutation();
  const [canSave, setCanSave] = useState(false);
  const [isNameChanged, setIsNameChanged] = useState(false);

  const onNameChange = useCallback(() => {
    const isChanged = inputRef.current?.value !== file.description[language];
    setIsNameChanged(isChanged);
    setCanSave(inputRef.current?.value !== '' && isChanged);
  }, [file, language]);

  const onRemove = useCallback(async () => {
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
      bgColor="white"
      borderRadius="md"
      outline="0.15em solid"
      outlineColor="green.500"
    >
      <Card variant="filled" size="sm" bgColor="green.main" color="white">
        <CardBody>
          <HStack>
            <Text flex="1">{file.filename}</Text>
            <Input
              ref={inputRef}
              onChange={onNameChange}
              placeholder="Display name"
              bgColor={isNameChanged ? 'yellow.100' : 'white'}
              color="darkgray"
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
              leftIcon={<Icon boxSize={6} as={MdClose} />}
              onClick={onRemove}
              colorScheme="red"
            >
              Remove
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default LanguageFileRow;
