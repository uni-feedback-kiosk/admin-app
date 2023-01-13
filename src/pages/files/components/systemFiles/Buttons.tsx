import { createRef } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/ui/Button';
import useNotifyOnError from '../../../../hooks/useNotifyOnError';
import { useAddFileMutation, useDeleteFileMutation, useLazyGetFileQuery, useUpdateFileMutation } from '../../../../store/apiSlice';
import { useAppSelector } from '../../../../store/store';
import FileButtonProps from '../FileButtonProps';

const HiddenInput = styled.input`
  display: none;
`;

export const UploadButton = ({ onError }: Pick<FileButtonProps, 'onError'>) => {
  const [addFile, { isError, error }] = useAddFileMutation();
  useNotifyOnError(onError, isError, error);

  const uploaderId = 'upload-btn';
  const inputRef = createRef<HTMLInputElement>();

  const onFilesSelected = () => {
    if (inputRef.current === null) {
      return;
    }

    const files = Array.from(inputRef.current.files!);
    files.forEach(addFile);
  };

  return (
    <Button onClick={() => inputRef.current?.click()}>
      <span>Upload</span>
      <HiddenInput
        ref={inputRef}
        onChange={onFilesSelected}
        id={uploaderId}
        type="file"
        accept="application/pdf"
        multiple
      />
    </Button>
  );
};

export const DownloadButton = ({ file, onError }: FileButtonProps) => {
  const [openFile, { isError, error }] = useLazyGetFileQuery();
  useNotifyOnError(onError, isError, error);

  return <Button onClick={() => openFile(file)}>Download</Button>;
};

export const AddToListButton = (
  { file, onError }: FileButtonProps,
) => {
  const [updateFile, { isError, error }] = useUpdateFileMutation();
  useNotifyOnError(onError, isError, error);
  const language = useAppSelector((store) => store.files.language);

  const addFile = () => {
    updateFile({ id: file.id, description: Object.fromEntries([[language, file.filename]]) });
  };

  return <Button onClick={addFile}>Add</Button>;
};

export const DeleteButton = ({ file, onError }: FileButtonProps) => {
  const [deleteFile, { isError, error }] = useDeleteFileMutation();
  useNotifyOnError(onError, isError, error);

  return <Button onClick={() => deleteFile(file.id)} color="negative">Delete</Button>;
};
