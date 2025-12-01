import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/shared/ui/Page';
import { SEO } from '@/shared/ui/SEO';

import cls from './HomePage.module.scss';

const FeatureCard = memo(
  ({ icon, title, description }: { icon: string; title: string; description: string }) => {
    return (
      <div className={cls.card}>
        <div className={cls.cardIcon}>{icon}</div>
        <h3 className={cls.cardTitle}>{title}</h3>
        <p className={cls.cardDescription}>{description}</p>
      </div>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

export const HomePage = () => {
  const { t } = useTranslation();

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Stardew Valley Checklist',
      description: t('HomePage.description'),
      url: 'https://dariabrusnitsina.github.io/stardew-valley-checklist/',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Person',
        name: 'DariaBrusnitsina',
        url: 'https://github.com/DariaBrusnitsina',
      },
      featureList: [
        t('HomePage.feature1.title'),
        t('HomePage.feature2.title'),
        t('HomePage.feature3.title'),
        t('HomePage.feature4.title'),
        t('HomePage.feature5.title'),
        t('HomePage.feature6.title'),
      ],
    }),
    [t]
  );

  const features = useMemo(
    () => [
      {
        icon: '📦',
        titleKey: 'HomePage.feature1.title',
        descriptionKey: 'HomePage.feature1.description',
      },
      {
        icon: '✅',
        titleKey: 'HomePage.feature2.title',
        descriptionKey: 'HomePage.feature2.description',
      },
      {
        icon: '📊',
        titleKey: 'HomePage.feature3.title',
        descriptionKey: 'HomePage.feature3.description',
      },
      {
        icon: '🎯',
        titleKey: 'HomePage.feature4.title',
        descriptionKey: 'HomePage.feature4.description',
      },
      {
        icon: '🏷️',
        titleKey: 'HomePage.feature5.title',
        descriptionKey: 'HomePage.feature5.description',
      },
      {
        icon: '🌙',
        titleKey: 'HomePage.feature6.title',
        descriptionKey: 'HomePage.feature6.description',
      },
    ],
    []
  );

  return (
    <>
      <SEO
        title={t('HomePage.title')}
        description={t('HomePage.description')}
        structuredData={structuredData}
      />
      <Page header={t('Home')}>
        <div className={cls.container}>
          <div className={cls.hero}>
            <h1 className={cls.title}>{t('HomePage.title')}</h1>
            <p className={cls.subtitle}>{t('HomePage.subtitle')}</p>
          </div>

          <div className={cls.description}>
            <p>{t('HomePage.description')}</p>
          </div>

          <div className={cls.features}>
            <h2 className={cls.featuresTitle}>{t('HomePage.featuresTitle')}</h2>
            <div className={cls.cards}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={t(feature.titleKey)}
                  description={t(feature.descriptionKey)}
                />
              ))}
            </div>
          </div>

          <div className={cls.cta}>
            <p className={cls.ctaText}>{t('HomePage.cta')}</p>
          </div>
        </div>
      </Page>
    </>
  );
};
