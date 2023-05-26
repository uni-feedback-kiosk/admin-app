import {
  Center,
  Fade,
  FlexProps,
  SystemStyleObject,
  forwardRef,
  useColorModeValue,
} from '@chakra-ui/react';
import { DragEventHandler, ReactNode, useCallback, useMemo } from 'react';

interface DropAreaProps {
  isShown: boolean;
  fileType: string;
  onDragLeave: () => void;
  onDrop: DragEventHandler;
  children: ReactNode;
}

const DropArea = forwardRef<FlexProps & DropAreaProps, 'div'>(
  ({ children, isShown, fileType, onDragLeave, onDrop, ...props }, ref) => {
    const color = useColorModeValue('green.900', 'green.50');
    const bgColor = useColorModeValue('green.200', 'green.800');

    const onDragOver = useCallback<DragEventHandler>(
      (event) => {
        if (event.dataTransfer.types.includes(fileType)) {
          event.preventDefault();
        }
      },
      [fileType],
    );

    const before: SystemStyleObject = useMemo(
      () => ({
        content: `""`,
        position: 'absolute',
        inset: 0,
        opacity: 0.3,
        bgColor,
      }),
      [bgColor],
    );

    return (
      <Center
        flexDirection="column"
        as={Fade}
        in={isShown}
        _before={before}
        position="absolute"
        inset="0"
        fontSize="2xl"
        zIndex={isShown ? 1 : -1}
        color={color}
        outline="0.2em dashed"
        outlineColor={color}
        outlineOffset="-1em"
        borderRadius="md"
        overflow="clip"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        {...{ ref, onDragOver, onDrop, onDragLeave }}
      >
        {children}
      </Center>
    );
  },
);

export default DropArea;
