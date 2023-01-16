import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { RemoveButton } from './Buttons';
import DisplayNameInput from './DisplayNameInput';
import FileRow from '../FileRow';
import { FileInfo } from '../../../../store/models';
import { useAppSelector, useAppDispatch } from '../../../../store/store';
import { clearHighlight, setError } from '../../filesSlice';

const StyledFilename = styled.div`
  flex: 2;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

interface HighlightedRowProps {
  highlighted?: boolean;
}

const rowHighlight = ({ highlighted }: HighlightedRowProps) => highlighted ? css`
  background: #fd0;
` : css``;

const StyledFileRow = styled(FileRow)<HighlightedRowProps>`
  transition: all 0.2s ease-in;
  ${rowHighlight}
`;

export default ({ file }: { file: FileInfo }) => {
  const highlightedFile = useAppSelector((store) => store.files.highlightedFile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!highlightedFile) {
      return () => {};
    }

    const id = setTimeout(() => dispatch(clearHighlight()), 200);

    return () => {
      clearTimeout(id);
    };
  }, [highlightedFile]);

  const onError = (err: string) => dispatch(setError(err));

  return (
    <StyledFileRow highlighted={file.id === highlightedFile}>
      <StyledFilename>{file.filename}</StyledFilename>
      <DisplayNameInput file={file} />
      <RemoveButton file={file} onError={onError} />
    </StyledFileRow>
  );
};
