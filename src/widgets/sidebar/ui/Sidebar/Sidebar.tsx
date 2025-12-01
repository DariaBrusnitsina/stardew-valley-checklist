import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { LanguageSwitcher } from '@/features/language-switcher';
import { ResetProgress } from '@/features/reset-progress';
import { ThemeSwitcher } from '@/features/theme-switcher';

import { useRoomContext } from '@/entities/room';

import { APP_NAME } from '@/shared/constants';
import { appData } from '@/shared/lib/data';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.438 9.8 8.207 11.387.599.111.82-.26.82-.577v-2.234
        c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.069-.608
        .069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088
        .636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27
        .098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336
        1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592
        1.028 2.683
        0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743
        0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-6.63-5.37-12-12-12z"
    />
  </svg>
);

export const Sidebar = memo(({ isOpen, onToggle }: SidebarProps) => {
  const { t } = useTranslation();
  const { completedTasks } = useRoomContext();
  const location = useLocation();
  const pathname = location.pathname;
  const contentRef = useRef<HTMLDivElement>(null);

  // Control body overflow on mobile
  useEffect(() => {
    if (isOpen) {
      // Check if we're on mobile (screen width <= 700px)
      const isMobile = window.innerWidth <= 700;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleContainerClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // Close menu when clicking on container (outside content)
      if (event.target === event.currentTarget) {
        onToggle();
      }
    },
    [onToggle]
  );

  const handleLinkClick = useCallback(() => {
    // Close menu when clicking on any link
    onToggle();
    window.scrollTo(0, 0);
  }, [onToggle]);

  // Memoize rooms list to avoid recalculating on every render
  const roomsList = useMemo(() => {
    return appData.bundles.flatMap((bundleCategory) =>
      bundleCategory.rooms.map((room) => {
        const completed = completedTasks[room.name as keyof typeof completedTasks] || 0;
        const remaining = room.amount - completed;
        const isRoomComplete = remaining === 0;

        return {
          room,
          completed,
          remaining,
          isRoomComplete,
        };
      })
    );
  }, [completedTasks]);

  return (
    <div className={`${cls.container} ${isOpen ? cls.open : ''}`} onClick={handleContainerClick}>
      <div ref={contentRef} className={cls.content} onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{APP_NAME}</h1>
          <div className={cls.section}>
            <Link
              className={`${cls.link} ${pathname === '/' ? cls.active : ''}`}
              to="/"
              onClick={handleLinkClick}
            >
              <img src="./icons/Animals_Icon.png" alt="Animals_Icon" loading="lazy" />
              <span className={cls.linkText}>{t('Home')}</span>
            </Link>

            {roomsList.map(({ room, isRoomComplete, remaining }) => (
              <Link
                key={room.name}
                className={`${cls.link} ${pathname === `/${room.name}` ? cls.active : ''}`}
                to={room.name}
                onClick={handleLinkClick}
              >
                <img src={`./icons/${room.name}.png`} alt={room.name} loading="lazy" />
                <span className={cls.linkText}>
                  {t(`rooms.${room.name}`, room.name.replace('_', ' '))}
                </span>
                {isRoomComplete ? (
                  <span className={cls.checkmark}>✓</span>
                ) : (
                  <span className={cls.badge}>{remaining}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className={cls.footer}>
          <div className={cls.footerSection}>
            <ThemeSwitcher />
            <ResetProgress />
            <LanguageSwitcher />
          </div>
          <div className={cls.githubLink}>
            <a
              href="https://github.com/DariaBrusnitsina/stardew-valley-checklist"
              target="_blank"
              rel="noopener noreferrer"
              className={cls.githubAnchor}
            >
              <GitHubIcon />
              <span>DariaBrusnitsina</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
