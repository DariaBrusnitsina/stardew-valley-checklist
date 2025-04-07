import { useTranslation } from 'react-i18next';

import cls from './HomePage.module.scss';
import Page from '../../components/Page/Page';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Page header="Home">
      <h3 className={cls.title}>{t('HomePage.title')}</h3>
      <p>{t('HomePage.description')}</p>

      <ul className={cls.list}>
        <li>{t('HomePage.li0')}</li>
        <li>{t('HomePage.li1')}</li>
        <li>{t('HomePage.li2')}</li>
        <li>{t('HomePage.li3')}</li>
      </ul>

      <p>{t('HomePage.footer')}</p>
    </Page>
  );
};

export default HomePage;
