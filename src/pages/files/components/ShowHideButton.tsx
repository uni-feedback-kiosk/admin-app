import { Button, Icon } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useUpdateFileMutation } from '../../../store/apiSlice';
import { FileInfo, Language } from '../../../store/models';
import { useAppSelector } from '../../../store/store';

const ShowHideButton = ({ file }: { file: FileInfo }) => {
  const [updateFile, { isLoading: isUpdating }] = useUpdateFileMutation();
  const language = useAppSelector((state) => state.files.language);

  const isShown = useMemo(() => file.description[language] !== '', [file, language]);

  const onShowHide = useCallback(async () => {
    if (isShown) {
      await updateFile({
        id: file.id,
        description: { [language]: '' } as Record<Language, string>,
      });
      return;
    }
    await updateFile({
      id: file.id,
      description: { [language]: file.filename } as Record<Language, string>,
    });
  }, [isShown, updateFile, file, language]);

  return (
    <Button
      leftIcon={<Icon boxSize={6} as={isShown ? IoMdEye : IoMdEyeOff} />}
      onClick={onShowHide}
      isLoading={isUpdating}
    >
      {isShown ? 'Hide' : 'Show'} ({language})
    </Button>
  );
};

export default ShowHideButton;
