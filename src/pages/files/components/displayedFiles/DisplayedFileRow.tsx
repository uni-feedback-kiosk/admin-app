import styled, { css } from 'styled-components';
import { createRef, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { RemoveButton } from './Buttons';
import DisplayNameInput from './DisplayNameInput';
import FileRow from '../row/FileRow';
import { FileInfo } from '../../../../store/models';
import { useAppSelector, useAppDispatch } from '../../../../store/store';
import { clearHighlight, setError } from '../../filesSlice';
import Highlight from '../../../../components/animation/Highlight';

const StyledFilename = styled.div`
  flex: 2;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

interface HighlightedRowProps {
  highlighted?: boolean;
}

const rowHighlight = ({ highlighted }: HighlightedRowProps) => highlighted ? css`
  animation-name: ${Highlight};
` : css``;

const StyledFileRow = styled(FileRow)<HighlightedRowProps>`
  animation-duration: 1s;
  ${rowHighlight}
`;

export default ({ file }: { file: FileInfo }) => {
  const highlightedFile = useAppSelector((store) => store.files.highlightedFile);
  const dispatch = useAppDispatch();
  const rowRef = createRef<HTMLDivElement>();
  const entry = useIntersectionObserver(rowRef, {});
  const isVisible = entry?.isIntersecting;

  useEffect(() => {
    if (highlightedFile !== file.id) {
      return () => {};
    }

    const id = setTimeout(() => dispatch(clearHighlight()), 1000);

    return () => {
      clearTimeout(id);
    };
  }, [highlightedFile]);

  useEffect(() => {
    if (highlightedFile !== file.id || !rowRef.current || isVisible) {
      return;
    }

    const { offsetParent, offsetTop } = rowRef.current;

    offsetParent?.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }, [highlightedFile]);

  const onError = (err: string) => dispatch(setError(err));

  return (
    <StyledFileRow ref={rowRef} highlighted={file.id === highlightedFile}>
      <StyledFilename>{file.filename}</StyledFilename>
      <DisplayNameInput file={file} />
      <RemoveButton file={file} onError={onError} />
    </StyledFileRow>
  );
};
