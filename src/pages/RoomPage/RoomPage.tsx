import { useTranslation } from 'react-i18next';

import cls from './RoomPage.module.scss';
import Bundle, { BundleType } from '../../components/Bundle/Bundle';
import LocalizedLink from '../../components/LocalizedLink/LocalizedLink';
import Page from '../../components/Page/Page';

interface RoomProps {
  room: {
    amount: number;
    name: string;
    description?: string;
    reward?: string;
    bundles: BundleType[];
  };
}
const RoomPage = ({ room }: RoomProps) => {
  const { t } = useTranslation();
  const visibleName = room.name.replace('_', ' ');

  return (
    <Page header={visibleName}>
      <div className={cls.header}>
        {!!room.reward && <LocalizedLink>{room.reward}</LocalizedLink>}
        {!!room.description && <h4>{t(room.description)}</h4>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {room.bundles.map((bundleItem) => (
          <Bundle
            key={bundleItem.name}
            roomName={room.name}
            bundleItem={bundleItem}
            roomAmount={room.amount}
          />
        ))}
      </div>
    </Page>
  );
};

export default RoomPage;
