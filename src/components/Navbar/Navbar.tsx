import cls from './Navbar.module.scss';

interface NavbarProps {
  onToggle: () => void;
}
const Navbar = ({ onToggle }: NavbarProps) => {
  return (
    <div className={cls.navbar}>
      <button onClick={onToggle}></button>

      <h4>Stardew Valley Checklist</h4>
    </div>
  );
};

export default Navbar;
