import { Card, CardBody, VStack, Icon, Text, forwardRef, CardProps } from '@chakra-ui/react';
import { MdFileCopy } from 'react-icons/md';
import { FileInfo } from '../../../store/models';

const DragPreview = forwardRef<CardProps & { file?: FileInfo }, 'div'>(({ file }, ref) => (
  <Card position="absolute" left="-100em" top="0" width="36" ref={ref}>
    <CardBody>
      <VStack width="0" minWidth="100%" wordBreak="break-word">
        <Icon boxSize="10" as={MdFileCopy} />
        <Text>{file?.filename}</Text>
      </VStack>
    </CardBody>
  </Card>
));

export default DragPreview;
