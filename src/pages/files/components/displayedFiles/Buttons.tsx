import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/ui/Button';
import useNotifyOnError from '../../../../hooks/useNotifyOnError';
import { useUpdateFileMutation } from '../../../../store/apiSlice';
import { useAppSelector } from '../../../../store/store';
import FileButtonProps from '../FileButtonProps';
import DoneIcon from '../../../../assets/DoneIcon.svg';
import PlusIcon from '../../../../assets/PlusIcon.svg';

const RotatedIconButton = styled(Button)`
  ::before {
    transform: rotate(45deg);
  }  
`;

export const SaveDescriptionButton = forwardRef<HTMLButtonElement, FileButtonProps & {
  inputRef: RefObject<HTMLInputElement>;
  onSuccess: () => void;
  className?: string;
  disabled?: boolean;
}>(
    (
      { file, onError, inputRef, onSuccess, className, disabled },
      ref,
    ) => {
      const [updateFile, { isError, error }] = useUpdateFileMutation();
      useNotifyOnError(onError, isError, error);
      const language = useAppSelector((store) => store.files.language);

      const renameFile = () => {
        if (inputRef.current === null) {
          return;
        }

        const { value } = inputRef.current;
        updateFile({
          id: file.id,
          description: Object.fromEntries([[language, value]]),
        }).unwrap().then(
          () => onSuccess(),
        );
      };

      return (
        <Button
          ref={ref}
          icon={DoneIcon}
          disabled={disabled}
          className={className}
          onClick={renameFile}
        >Save
        </Button>
      );
    },
    );

export const RemoveButton = ({ file, onError }: FileButtonProps) => {
  const language = useAppSelector((store) => store.files.language);
  const [updateFile, { isError, error }] = useUpdateFileMutation();
  useNotifyOnError(onError, isError, error);

  const removeFile = () => {
    updateFile({ id: file.id, description: Object.fromEntries([[language, '']]) });
  };

  return <RotatedIconButton icon={PlusIcon} onClick={removeFile} color="negative">Remove</RotatedIconButton>;
};
