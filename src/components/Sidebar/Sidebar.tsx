import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import cls from './Sidebar.module.scss';
import data from '../../../database.json';
import { useRoomContext } from '../../hook/RoomContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}
const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { t, i18n } = useTranslation();
  const { completedTasks } = useRoomContext();
  const location = useLocation();
  const pathname = location.pathname;
  const language = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const resetProgress = () => {
    const text = t('Are you sure you want to reset your progression?');
    if (confirm(text) == true) {
      localStorage.clear();
      localStorage.setItem('i18nextLng', language);
      window.location.reload();
    }
  };

  const onToggleSidebar = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (
      (target.classList.contains('sidebar_container') && target.classList.contains('open')) ||
      target.tagName === 'A'
    ) {
      onToggle();
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className={`${cls.container} ${isOpen ? cls.open : ''}`}
      onClick={(event) => onToggleSidebar(event)}
    >
      <div className={cls.content}>
        <div>
          <h1>Stardew Valley Checklist</h1>
          <Link className={`${cls.link} ${pathname === '/' ? cls.active : ''}`} to="/">
            <img
              src="./icons/Animals_Icon.png"
              alt="Animals_Icon"
              loading='lazy'
            />
            {t('Home')}
          </Link>

          {data.bundles.map((bundlesCathegory) => (
            <>
              <h4>{t(bundlesCathegory.name)}</h4>
              {bundlesCathegory.rooms.map((room) => (
                <Link
                  className={`${cls.link} ${pathname === `/${room.name}` ? cls.active : ''}`}
                  to={room.name}
                >
                  <img src={`./icons/${room.name}.png`} alt={room.name} loading='lazy' />
                  {t(room.name.replace('_', ' '))}
                  {completedTasks[room.name] === room.amount
                    ? ' ✅'
                    : ` ${completedTasks[room.name]}/${room.amount}`}
                </Link>
              ))}
            </>
          ))}
        </div>

        <div>
          <div>
            <button className={cls.reset} onClick={resetProgress}>
              <img src="./icons/arrow-clockwise.svg" alt="arrow" loading='lazy'/>
              <p>{t('Reset Progress')}</p>
            </button>
          </div>

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

          <div className={cls.diminished}>
            Code by{' '}
            <a href="https://github.com/DariaBrusnitsina/stardew-valley-checklist" target="_blank">
              DariaBrusnitsina
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
