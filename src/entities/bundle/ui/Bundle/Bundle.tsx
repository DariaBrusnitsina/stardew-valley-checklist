import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { localStorageKeys, localStorageUtils } from '@/shared/lib/localStorage';
import type { Bundle as BundleType } from '@/shared/types';
import { LocalizedLink } from '@/shared/ui/LocalizedLink';

import { BundleItem } from '../BundleItem';
import cls from './Bundle.module.scss';

interface BundleProps {
  bundle: BundleType;
  roomName: string;
}

export const Bundle = memo(({ bundle, roomName }: BundleProps) => {
  const { t } = useTranslation();
  const localStorageKey = localStorageKeys.getRoomBundleKey(roomName, bundle.name);

  const completedItems = localStorageUtils.getCompletedCount(
    localStorageKeys.getBundleItemKey(bundle.name, '')
  );

  const [completed, setCompleted] = useState(completedItems);
  const [open, setOpen] = useState<boolean>(completedItems !== bundle.amount);

  const checkBundle = useCallback(() => {
    const completedCount = localStorageUtils.getCompletedCount(
      localStorageKeys.getBundleItemKey(bundle.name, '')
    );
    setCompleted(completedCount);

    if (bundle.amount === completedCount) {
      setOpen(false);
      localStorageUtils.setItem(localStorageKey, true);
    }
  }, [bundle.name, bundle.amount, localStorageKey]);

  const isComplete = useMemo(() => bundle.amount === completed, [bundle.amount, completed]);

  const progressPercentage = useMemo(() => {
    if (bundle.amount === 0) {
      return 0;
    }
    return Math.min((completed / bundle.amount) * 100, 100);
  }, [completed, bundle.amount]);

  // Calculate offset for SVG stroke-dasharray
  const circumference = 2 * Math.PI * 26; // radius = 26 (56px / 2 - 2px for stroke)
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleHeaderClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't close dropdown when clicking on links or other interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        return;
      }
      toggleOpen();
    },
    [toggleOpen]
  );

  return (
    <div className={`${cls.bundle} ${isComplete ? cls.done : ''}`}>
      <div className={cls.header} onClick={handleHeaderClick}>
        <div className={cls.iconWrapper}>
          <div className={cls.iconCircle}>
            <svg className={cls.progressRing} viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke={isComplete ? '#7ec488' : '#8a2be2'}
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={isComplete ? 0 : strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 28 28)"
              />
            </svg>
            <img
              src={`./icons/bundle/${bundle.icon}.png`}
              alt={bundle.icon}
              loading="lazy"
              className={`${cls.iconImage} ${!open ? cls.iconImageVisible : ''}`}
            />
            <img
              src={`./icons/bundle/${bundle.icon}_open.png`}
              alt={bundle.icon}
              loading="lazy"
              className={`${cls.iconImage} ${open ? cls.iconImageVisible : ''}`}
            />
          </div>
        </div>
        <div className={cls.content}>
          <h3>{t(`bundles.${bundle.name}`, bundle.name)}</h3>
          {bundle.reward && (
            <div className={cls.reward}>
              <span className={cls.rewardLabel}>{t('Reward')}:</span>{' '}
              <LocalizedLink>{bundle.reward}</LocalizedLink>
            </div>
          )}
          {!isComplete && (
            <div className={cls.status}>{`${completed} / ${bundle.amount} ${t('items')}`}</div>
          )}
        </div>
        <div className={`${cls.arrow} ${open ? cls.arrowOpen : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className={`${cls.dropdown} ${open ? cls.dropdownOpen : ''}`}>
        <div className={cls.dropdownContent} onClick={(e) => e.stopPropagation()}>
          {bundle.items.map((item) => (
            <BundleItem
              key={item.name}
              bundleName={bundle.name}
              itemName={item.name}
              tags={item.tags}
              onCheck={checkBundle}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Bundle.displayName = 'Bundle';
