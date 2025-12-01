import { useTranslation } from 'react-i18next';

import { localStorageUtils } from '@/shared/lib/localStorage';

import cls from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorageUtils.setLanguage(lng);
  };

  return (
    <div className={cls.languages}>
      <button
        className={language === 'en' ? cls.selected : ''}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={language === 'ru' ? cls.selected : ''}
        onClick={() => changeLanguage('ru')}
      >
        Русский
      </button>
    </div>
  );
};
