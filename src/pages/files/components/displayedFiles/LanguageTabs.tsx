import { ChangeEvent } from 'react';
import { Language } from './Language';
import TabToggle from './TabToggle';

interface LanguageTabsProps {
  onLanguageChanged: (lang: Language) => void;
}

export default ({ onLanguageChanged }: LanguageTabsProps) => {
  const toggleLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      return;
    }

    const newValue = e.target.value as Language;
    onLanguageChanged(newValue);
  };

  return (
    <>
      <TabToggle onChange={toggleLanguage} name="language" value="ru" defaultChecked>Russian</TabToggle>
      <TabToggle onChange={toggleLanguage} name="language" value="en">English</TabToggle>
    </>
  );
};
