import {
  VStack,
  Card,
  CardBody,
  Text,
  Spinner,
  HStack,
  Spacer,
  Button,
  Icon,
  Input,
} from '@chakra-ui/react';
import { MdFileCopy, MdUpload } from 'react-icons/md';
import { useRef, useCallback, useState } from 'react';
import { useUploadFileMutation, useListFilesQuery } from '../../../store/apiSlice';
import SystemFileRow from './SystemFileRow';
import { FileInfo } from '../../../store/models';
import DragPreview from './DragPreview';

const SystemFiles = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const { data, isLoading } = useListFilesQuery();
  const [draggedFile, setDraggedFile] = useState<FileInfo>();
  const dragPreviewRef = useRef<HTMLDivElement>(null);

  const onFilesSelected = useCallback(async () => {
    const files = Array.from(fileInputRef.current?.files ?? []);
    await Promise.all(files.map(uploadFile));
  }, [uploadFile]);

  return (
    <>
      <VStack align="stretch" height="0" minHeight="100%">
        <HStack>
          <Text fontSize="lg">Files in the system</Text>
          <Spacer />
          <Button
            leftIcon={<Icon boxSize={6} as={MdUpload} />}
            onClick={() => fileInputRef.current?.click()}
            isLoading={isUploading}
          >
            <Text>Upload</Text>
            <Input
              ref={fileInputRef}
              onChange={onFilesSelected}
              type="file"
              accept="application/pdf"
              multiple
              hidden
            />
          </Button>
        </HStack>
        <Card zIndex={0} variant="filled" flex="1" height="0" overflowY="auto">
          <CardBody>
            {isLoading && <Spinner size="xl" />}
            {data && (
              <VStack align="stretch">
                {data.map((file) => (
                  <SystemFileRow
                    key={file.id}
                    file={file}
                    onDragStarted={setDraggedFile}
                    dragPreview={dragPreviewRef.current}
                  />
                ))}
              </VStack>
            )}
          </CardBody>
        </Card>
      </VStack>
      <DragPreview ref={dragPreviewRef} file={draggedFile} />
    </>
  );
};

export default SystemFiles;
