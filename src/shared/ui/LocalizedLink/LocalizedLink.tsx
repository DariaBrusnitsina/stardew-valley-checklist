import { useTranslation } from 'react-i18next';

import cls from './LocalizedLink.module.scss';

interface LocalizedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  underline?: boolean;
}

export const LocalizedLink: React.FC<LocalizedLinkProps> = ({
  children,
  underline = false,
  ...props
}) => {
  const { t, i18n } = useTranslation();
  // Try to find translation in items or rewards objects first, then fallback to root level
  const itemsKey = `bundleItems.${children}`;
  const rewardsKey = `rewards.${children}`;

  const itemsTranslation = t(itemsKey);
  const rewardsTranslation = t(rewardsKey);

  const localizedText =
    itemsTranslation !== itemsKey
      ? itemsTranslation
      : rewardsTranslation !== rewardsKey
        ? rewardsTranslation
        : t(children);

  const baseUrl =
    i18n.language === 'ru' ? 'https://ru.stardewvalleywiki.com/' : 'https://stardewvalleywiki.com/';

  const [text, path, counter] = localizedText.split('&');

  const displayText: string = t(text.replace('_repeated', '').replace('_', ' '));

  const fullUrl = `${baseUrl}${path ? path : text}`;

  return (
    <a
      className={`${cls.link} ${underline && cls.underline}`}
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span className={cls.linkText}>{displayText}</span>
      {counter && <span className={cls.counter}>x{counter}</span>}
    </a>
  );
};
