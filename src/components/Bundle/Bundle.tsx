import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Bundle.module.scss';
import Checkbox from '../Checkbox/Checkbox.tsx';
import LocalizedLink from '../LocalizedLink/LocalizedLink.tsx';

export interface BundleType {
  amount: number;
  name: string;
  icon: string;
  reward?: string;
  items: { name: string; origin?: string }[];
}

interface BundleProps {
  bundleItem: BundleType;
  roomName: string;
  roomAmount: number;
}

const Bundle = ({ bundleItem, roomName, roomAmount }: BundleProps) => {
  const { t } = useTranslation();
  const localStorageKey = `room-${roomName}-bundle-${bundleItem.name}`;
  const completedItems = Object.entries(localStorage).filter(
    (key) => key[0].startsWith(`bundle-${bundleItem.name}`) && key[1] === 'true'
  ).length;
  const [completed, setCompleted] = useState(completedItems);
  const [open, setOpen] = useState<boolean>(completedItems !== bundleItem.amount);

  function checkBundle() {
    const items = Object.keys(localStorage).filter((key) =>
      key.startsWith(`bundle-${bundleItem.name}`)
    );
    const completed = items.filter((key) => localStorage.getItem(key) === 'true');
    setCompleted(completed.length);

    // close the bundle
    if (bundleItem.amount === completed.length) {
      setOpen(false);
      localStorage.setItem(localStorageKey, 'true');
    }
  }

  const complete = useMemo(() => bundleItem.amount === completed, [bundleItem.amount, completed]);

  return (
    <div className={cls.bundle} style={{ order: bundleItem.amount === completed ? roomAmount : 1 }}>
      <div className={`${cls.header} ${complete ? cls.done : ''}`}>
        <img
          src={`./icons/bundle/${bundleItem.icon}${open ? '_open' : ''}.png`}
          alt={bundleItem.icon}
          loading='lazy'
        />
        <h3>
          {t(bundleItem.name)}
          {!complete && ` [${completed}/${bundleItem.amount}] `}
          {!!bundleItem.reward && !complete && <LocalizedLink>{bundleItem.reward}</LocalizedLink>}
        </h3>
      </div>

      <div className={open ? '' : cls.hide}>
        {bundleItem.items.map((item) => (
          <>
            <Checkbox
              key={item.name}
              bundle={bundleItem.name}
              item={item.name}
              origin={item.origin}
              check={checkBundle}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Bundle;
