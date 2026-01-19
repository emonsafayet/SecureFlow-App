interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <header>
      <button onClick={onMenuClick}>
        ☰
      </button>
    </header>
  );
};

export default Topbar;
