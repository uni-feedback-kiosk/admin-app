import { createRef, KeyboardEventHandler, useState } from 'react';
import styled from 'styled-components';
import Input from '../../../../components/ui/Input';
import { colors } from '../../../../constants';
import { FileInfo } from '../../../../store/models';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setError } from '../../filesSlice';
import { SaveDescriptionButton } from './Buttons';

const StyledWrapper = styled.div`
  flex: 1;
  min-width: 15em;
  padding-right: 4em;
  position: relative;
`;

const StyledSaveButton = styled(SaveDescriptionButton)`
  border: 0.1em solid ${colors.green_active};
  position: absolute;
  right: 0;

  :disabled {
    border-color: ${colors.dark_grey};
  }
`;

export default ({ file }: { file: FileInfo }) => {
  const language = useAppSelector((store) => store.files.language);
  const dispatch = useAppDispatch();
  const inputRef = createRef<HTMLInputElement>();
  const buttonRef = createRef<HTMLButtonElement>();
  const [canChange, setCanChange] = useState(false);

  const updateCanChange = () => {
    if (!inputRef.current) {
      return;
    }

    const { value } = inputRef.current;

    setCanChange(
      value !== '' && value !== file.description[language],
    );
  };

  const onKeyPressed: KeyboardEventHandler = (event) => {
    if (event.key !== 'Enter' || !buttonRef.current) {
      return;
    }

    buttonRef.current.click();
  };

  return (
    <StyledWrapper>
      <Input
        onKeyDown={onKeyPressed}
        onChange={updateCanChange}
        ref={inputRef}
        type="text"
        placeholder="Display name"
        defaultValue={file.description[language]}
      />
      <StyledSaveButton
        ref={buttonRef}
        disabled={!canChange}
        file={file}
        inputRef={inputRef}
        onError={(error) => dispatch(setError(error))}
        onSuccess={() => setCanChange(false)}
      />
    </StyledWrapper>
  );
};
