import Button from '../../../../components/ui/Button';
import useNotifyOnError from '../../../../hooks/useNotifyOnError';
import { useUpdateFileMutation } from '../../../../store/apiSlice';
import { useAppSelector } from '../../../../store/store';
import FileButtonProps from '../FileButtonProps';

export const SaveDescriptionButton = (
  { file, onError }: FileButtonProps,
) => {
  const [updateFile, { isError, error }] = useUpdateFileMutation();
  useNotifyOnError(onError, isError, error);
  const language = useAppSelector((store) => store.files.language);

  const addFile = () => {
    updateFile({ id: file.id, description: Object.fromEntries([[language, '']]) });
  };

  return <Button onClick={addFile}>Add</Button>;
};

export const RemoveButton = ({ file, onError }: FileButtonProps) => {
  const language = useAppSelector((store) => store.files.language);
  const [updateFile, { isError, error }] = useUpdateFileMutation();
  useNotifyOnError(onError, isError, error);

  const removeFile = () => {
    updateFile({ id: file.id, description: Object.fromEntries([[language, '']]) });
  };

  return <Button onClick={removeFile} color="negative">Delete</Button>;
};
