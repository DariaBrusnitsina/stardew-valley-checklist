import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Bundle } from '@/entities/bundle';

import { localStorageKeys, localStorageUtils } from '@/shared/lib/localStorage';
import type { Room } from '@/shared/types';
import { LocalizedLink } from '@/shared/ui/LocalizedLink';
import { Page } from '@/shared/ui/Page';
import { SEO } from '@/shared/ui/SEO';

import cls from './RoomPage.module.scss';

interface RoomPageProps {
  room: Room;
}

export const RoomPage = memo(({ room }: RoomPageProps) => {
  const { t } = useTranslation();
  const visibleName = useMemo(
    () => t(`rooms.${room.name}`, room.name.replace('_', ' ')),
    [t, room.name]
  );

  // Check if all bundles are completed (check via localStorage)
  const allBundlesComplete = useMemo(() => {
    return room.bundles.every((bundle) => {
      const bundleKey = localStorageKeys.getRoomBundleKey(room.name, bundle.name);
      return localStorageUtils.getItem(bundleKey);
    });
  }, [room.bundles, room.name]);

  const roomDescription = useMemo(() => {
    if (room.description) {
      return t(room.description);
    }
    return `Track your progress for ${visibleName} bundles in Stardew Valley Community Center.`;
  }, [room.description, visibleName, t]);

  const roomKeywords = useMemo(() => {
    return [
      'stardew valley',
      visibleName.toLowerCase(),
      'community center',
      'bundles',
      room.name.toLowerCase(),
      'progress tracker',
    ].join(', ');
  }, [visibleName, room.name]);

  return (
    <>
      <SEO
        title={visibleName}
        description={roomDescription}
        keywords={roomKeywords}
        url={`/#/${room.name}`}
      />
      <Page header={visibleName}>
        <div className={cls.header}>
          {room.reward && (
            <div className={cls.rewardSection}>
              <div className={cls.rewardContainer}>
                <div className={cls.rewardIcon}>🎁</div>
                <div className={cls.rewardContent}>
                  <div className={cls.rewardLabel}>{t('Reward')}:</div>
                  <LocalizedLink className={cls.rewardLink}>{room.reward}</LocalizedLink>
                </div>
              </div>
            </div>
          )}
          {room.description && (
            <div
              className={`${cls.descriptionSection} ${
                allBundlesComplete ? cls.descriptionUnlocked : cls.descriptionLocked
              }`}
            >
              <div className={cls.descriptionIcon}>{allBundlesComplete ? '🎉' : '🔒'}</div>
              <h4 className={cls.description}>{t(room.description)}</h4>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {room.bundles.map((bundle) => (
            <Bundle key={bundle.name} bundle={bundle} roomName={room.name} />
          ))}
        </div>
      </Page>
    </>
  );
});

RoomPage.displayName = 'RoomPage';
