import { memo } from 'react';

import { APP_NAME } from '@/shared/constants';

import cls from './Navbar.module.scss';

interface NavbarProps {
  onToggle: () => void;
}

export const Navbar = memo(({ onToggle }: NavbarProps) => {
  return (
    <div className={cls.navbar}>
      <button onClick={onToggle} aria-label="Toggle sidebar"></button>
      <h4>{APP_NAME}</h4>
    </div>
  );
});

Navbar.displayName = 'Navbar';
