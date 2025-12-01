import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoomContext } from '@/entities/room';

import { getItemIcon } from '@/shared/lib/itemIcon';
import { localStorageKeys, localStorageUtils } from '@/shared/lib/localStorage';
import { getTagColor } from '@/shared/lib/tagColor';
import { LocalizedLink } from '@/shared/ui/LocalizedLink';

import cls from './BundleItem.module.scss';

interface BundleItemProps {
  bundleName: string;
  itemName: string;
  tags?: string[];
  onCheck: () => void;
}

export const BundleItem = memo(({ bundleName, itemName, tags, onCheck }: BundleItemProps) => {
  const { t } = useTranslation();
  const { updateCompletedRoom } = useRoomContext();

  const localStorageKey = useMemo(
    () => localStorageKeys.getBundleItemKey(bundleName, itemName),
    [bundleName, itemName]
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const itemIcon = useMemo(() => getItemIcon(itemName), [itemName]);

  const handleCheckboxClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const state = event.currentTarget.checked;
      localStorageUtils.setItem(localStorageKey, state);
      setIsChecked(state);
      onCheck();
      updateCompletedRoom();
    },
    [localStorageKey, onCheck, updateCompletedRoom]
  );

  useEffect(() => {
    const isCheckedItem = localStorageUtils.getItem(localStorageKey);
    setIsChecked(isCheckedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${cls.item} ${isChecked ? cls.done : ''}`}>
      <input
        onChange={handleCheckboxClick}
        type="checkbox"
        checked={isChecked}
        className={cls.checkbox}
      />
      <img
        src={`./icons/item/${itemIcon}.png`}
        alt={itemName}
        loading="lazy"
        className={cls.icon}
      />
      <div className={cls.content}>
        <span className={cls.itemName}>
          <LocalizedLink underline={false}>{itemName}</LocalizedLink>
        </span>
        {tags && tags.length > 0 && (
          <div className={cls.tags}>
            {tags.map((tag, index) => {
              const tagColor = getTagColor(tag);
              return (
                <span
                  key={index}
                  className={`${cls.tag} ${
                    cls[`tag${tagColor.charAt(0).toUpperCase() + tagColor.slice(1)}`]
                  }`}
                >
                  {t(`tags.${tag}`, tag)}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

BundleItem.displayName = 'BundleItem';
