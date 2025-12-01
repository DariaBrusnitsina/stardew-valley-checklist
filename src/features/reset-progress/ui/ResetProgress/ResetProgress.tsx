import { useTranslation } from 'react-i18next';

import { localStorageUtils } from '@/shared/lib/localStorage';

import cls from './ResetProgress.module.scss';

export const ResetProgress = () => {
  const { t, i18n } = useTranslation();

  const resetProgress = () => {
    const text = t('Are you sure you want to reset your progression?');
    if (confirm(text) === true) {
      const language = i18n.language;
      const theme = localStorage.getItem('theme'); // Save theme before clearing
      localStorageUtils.clear();
      localStorageUtils.setLanguage(language);
      // Restore theme if it was explicitly chosen by user
      if (theme) {
        localStorage.setItem('theme', theme);
      }
      window.location.reload();
    }
  };

  return (
    <button className={cls.reset} onClick={resetProgress}>
      <img src="./icons/arrow-clockwise.svg" alt="arrow" loading="lazy" />
      <p>{t('Reset Progress')}</p>
    </button>
  );
};
