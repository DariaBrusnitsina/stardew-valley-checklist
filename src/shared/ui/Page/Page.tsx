import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Page.module.scss';

interface PageProps {
  header: string;
  children: ReactNode;
}

export const Page = ({ header, children }: PageProps) => {
  const { t } = useTranslation();

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h1>{t(header)}</h1>
      </div>
      <div className={cls.content}>{children}</div>
    </div>
  );
};
