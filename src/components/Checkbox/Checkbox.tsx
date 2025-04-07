import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Checkbox.module.scss';
import { useRoomContext } from '../../hook/RoomContext';
import LocalizedLink from '../LocalizedLink/LocalizedLink';

interface CheckboxProps {
  bundle: string;
  item: string;
  origin?: string;

  check: () => void;
}
const Checkbox = ({ bundle, item, origin, check }: CheckboxProps) => {
  const { t } = useTranslation();
  const { updateCompletedRoom } = useRoomContext();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const localStorageKey = `bundle-${bundle}-item-${item}`;
  const itemIcon = item.includes('Money_')
    ? 'Money'
    : item
      .replace('_repeated', '')
      .replaceAll(' ', '_');

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const state = event.currentTarget.checked;
    localStorage.setItem(localStorageKey, state.toString());
    setIsChecked(state);
    check();
    updateCompletedRoom();
  };

  useEffect(() => {
    const isCheckedItem = localStorage.getItem(localStorageKey) === 'true';
    setIsChecked(isCheckedItem);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${cls.checkbox} ${isChecked ? cls.done : ''}`}>
      <input onChange={handleCheckboxClick} type="checkbox" checked={isChecked} />
      <img
        src={`./icons/item/${itemIcon}.png`}
        alt={item}
        loading='lazy'
      />
      <p>
        <LocalizedLink underline>{item}</LocalizedLink> {!!origin && t(origin)}
      </p>
    </div>
  );
};

export default Checkbox;
