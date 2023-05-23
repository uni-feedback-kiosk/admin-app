import { Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Language } from '../../../store/models';
import LanguageFilesList from './LanguageFilesList';
import { useAppDispatch } from '../../../store/store';
import { filesLanguageSwitched } from '../../../store/actions';

const languages: Record<Language, string> = {
  en: 'English',
  ru: 'Russian',
};

const languageNames = Object.entries(languages);

const LanguageFiles = () => {
  const dispatch = useAppDispatch();

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
      gap="4"
      variant="solid-rounded"
      colorScheme="green"
      height="100%"
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
          <TabPanel key={language} height="100%" padding="0">
            <Card height="100%" variant="filled">
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
