import { useTranslation } from 'react-i18next';

import cls from './LocalizedLink.module.scss';

interface LocalizedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  underline?: boolean;
}

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ children, underline = false, ...props }) => {
  const { t, i18n } = useTranslation();

  children = t(children);

  const baseUrl =
    i18n.language === 'ru' ? 'https://ru.stardewvalleywiki.com/' : 'https://stardewvalleywiki.com/';

  let displayText: string = t(children.replace('_repeated', '').replace('_', ' '));
  let path: string = t(children.replace('_brown', ''));

  const match = children.match(/\((.*?)\)\[(.*?)\]/);
  if (match) {
    displayText = match[1];
    path = `${match[2]}`;
  }

  const fullUrl = `${baseUrl}${path}`;

  return (
    <a
      className={`${cls.link} ${underline && cls.underline}`}
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {displayText}
    </a>
  );
};

export default LocalizedLink;
