import {
  Card,
  CardBody,
  Icon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { DragEventHandler, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { FileInfo, Language } from '../../../store/models';
import LanguageFilesList from './LanguageFilesList';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fileDrop, filesLanguageSwitched } from '../../../store/actions';
import { useUpdateFileMutation } from '../../../store/apiSlice';
import KioskFileType from '../KioskFileType';
import DropArea from './DropArea';
import useFileDrag from '../hooks/useFileDrag';
import { languageNames } from '../Languages';

const LanguageFiles = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.files.language);
  const [updateFile, { isLoading: isAddingFile }] = useUpdateFileMutation();
  const [isDropAreaShown, { show: showDropArea, hide: hideDropArea }] = useFileDrag({
    fileTypeFilter: KioskFileType,
    dropEffect: 'link',
  });

  const onFileDropped = useCallback<DragEventHandler>(
    async (event) => {
      event.preventDefault();
      const file = JSON.parse(event.dataTransfer.getData(KioskFileType)) as FileInfo;

      hideDropArea();
      dispatch(fileDrop(file));
      if (file.description[currentLanguage] !== '') {
        return;
      }

      await updateFile({
        id: file.id,
        description: Object.fromEntries([[currentLanguage, file.filename]]) as Record<
          Language,
          string
        >,
      });
    },
    [updateFile, currentLanguage, hideDropArea, dispatch],
  );

  const onTabSwitch = useCallback(
    (language: Language) => {
      dispatch(filesLanguageSwitched(language));
    },
    [dispatch],
  );

  return (
    <Tabs
      display="flex"
      flexDirection="column"
      gap="2"
      variant="solid-rounded"
      colorScheme="green"
      height="0"
      minHeight="100%"
      isFitted
    >
      <TabList gap="6">
        {languageNames.map(([language, name]) => (
          <Tab
            onClick={() => onTabSwitch(language as Language)}
            borderRadius="md"
            outline="0.1em solid"
            outlineColor="green.500"
            key={language}
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels flex="1">
        {languageNames.map(([language]) => (
          <TabPanel key={language} height="0" minHeight="100%" padding="0" position="relative">
            <DropArea
              isShown={isDropAreaShown}
              onDragLeave={hideDropArea}
              onDrop={onFileDropped}
              fileType={KioskFileType}
            >
              {isAddingFile ? (
                <Spinner size="xl" />
              ) : (
                <>
                  <Icon boxSize={20} as={MdAdd} />
                  <Text>Drop the file to add it</Text>
                </>
              )}
            </DropArea>
            <Card onDragEnter={showDropArea} height="100%" variant="filled" overflowY="auto">
              <CardBody>
                <LanguageFilesList language={language as Language} />
              </CardBody>
            </Card>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default LanguageFiles;
