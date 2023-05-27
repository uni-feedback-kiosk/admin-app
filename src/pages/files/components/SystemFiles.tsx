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
  Box,
} from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';
import { useRef, useCallback, useState, DragEventHandler } from 'react';
import { useUploadFileMutation, useListFilesQuery } from '../../../store/apiSlice';
import SystemFileRow from './SystemFileRow';
import { FileInfo } from '../../../store/models';
import DragPreview from './DragPreview';
import { OSFile } from '../KioskFileType';
import DropArea from './DropArea';
import useFileDrag from '../hooks/useFileDrag';
import ActionsMenu from './ActionsMenu';

const SystemFiles = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const { data, isLoading } = useListFilesQuery();
  const [draggedFile, setDraggedFile] = useState<FileInfo>();
  const dragPreviewRef = useRef<HTMLDivElement>(null);

  const [isDropAreaShown, { show: showDropArea, hide: hideDropArea }] = useFileDrag({
    fileTypeFilter: OSFile,
    dropEffect: 'copy',
  });

  const onFileDropped = useCallback<DragEventHandler>(
    async (event) => {
      event.preventDefault();

      await Promise.all(
        [...event.dataTransfer.files]
          .filter(({ type }) => type === 'application/pdf')
          .map(uploadFile),
      );
      hideDropArea();
    },
    [uploadFile, hideDropArea],
  );

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
          <ActionsMenu />
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
        <Box flex="1" position="relative">
          <DropArea
            isShown={isDropAreaShown}
            onDragLeave={hideDropArea}
            onDrop={onFileDropped}
            fileType={OSFile}
          >
            {isUploading ? (
              <Spinner size="xl" />
            ) : (
              <>
                <Icon boxSize={20} as={MdUpload} />
                <Text>Drop the files to upload them</Text>
              </>
            )}
          </DropArea>
          <Card
            onDragEnter={showDropArea}
            variant="filled"
            height="0"
            minHeight="100%"
            overflowY="auto"
          >
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
        </Box>
      </VStack>
      <DragPreview ref={dragPreviewRef} file={draggedFile} />
    </>
  );
};

export default SystemFiles;
